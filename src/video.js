import React from 'react';
import PrettyProgressbar from 'pretty-progressbar';
import {
    secondsToVideoTimeConverter,
    generateRandomId
} from './helpers';
import {
    propTypes,
    defaultProps,
    validVideoTypes,

    progressbarStyle,
    progressStyle,
} from './constants';

import play from '../assets/play.png';
import pause from '../assets/pause.png';
import forward from '../assets/forward.png';
import backward from '../assets/backward.png';
import replay from '../assets/replay.png';
import settings from '../assets/settings.png';
import fullscreen from '../assets/fullscreen.png';
import expand from '../assets/expand.png';
import fixedTop from '../assets/fixed-top.png';
import fixedRemove from '../assets/fixed-remove.png';


require('./app.scss');

/**
 * @name : HeartyMediaPlayer
 * @description : This class prepare a video component and renders according to the props
 * @argument {*} props
 * @argument {*} propTypes
 * @argument {*} defaultProps
 * @author krishcdbry
 */
class HeartyMediaPlayer extends React.Component {

    /**
     * @constructor
     * @param {*} context 
     * @param {*} props 
     */
    constructor(context, props) {
        super(context, props);

        let {
            src, 
            id,
            className,
            poster, 
            preload, 
            autoplay,
            muted,
            loop
        } = this.props;
        
        this.state = {
            src : src,
            id : id || generateRandomId(),
            className: className || null,
            sourceElem : null,
            preload : preload,
            autoplay : autoplay,
            playing : false,
            replay : false,
            progress : 0,
            fullScreen : false,
            volume : (muted) ? 0 : 5,
            muted : muted,
            loop : loop,
            playbackRate: 1,
            showPlaybackOptions: false,
            fixedTop: false,
            mouseOver : true,
            poster : poster || null,
            started : false,
        }

        this.video = null;
        this.source = null;
    }

    /**
     * @name _loadVideo
     * @description loads the video - (Renders the source data into video element)
     * @method HeartyMediaPlayer
     */
    _loadVideo() {
        let {onLoadVideo, onErrorVideo} = this.props;

        if (!this.state.sourceElem && this.video) {
            this.setState({
                sourceElem : this.preareVideoSource()
            });
            
            this.video.load();

            if (onLoadVideo) {
                onLoadVideo(this.video);
            }

            if (this.state.muted) {
                this.video.volume = 0;
            }

            if (typeof this.video.loop == 'boolean') {
                this.video.loop = this.state.loop;
            }
        }
    }

    /**
     * @name _play
     * @description Plays the video and calls the onStartVideo callback function if provided
     * @method HeartyMediaPlayer
     */
    _play() {
        let {onStartVideo} = this.props;
        this._loadVideo();
        this.video.play();
        this.setState({
            playing : true,
            replay : false,
            started : true,
            showPlaybackOptions: false
        });

        this.video.ontimeupdate = () => {
            this._onPlaying();
        }

        this.video.onended = () => {
            this._onEnded();
        }

        console.log(this.source);

        setTimeout(() => {
            this.source.onerror = () => {
                this.props.onErrorVideo();
            }
        }, 100);
    
        if (onStartVideo) {
            onStartVideo(this.video);
        }
    }

    /**
     * @name _pause
     * @description Pauses the video and calls the onPauseVideo callback function if provided
     * @method HeartyMediaPlayer
     */
    _pause() {
        let {onPauseVideo} = this.props;
        this.video.pause();
        this.setState({
            playing : false
        });
        if (onPauseVideo) {
            onPauseVideo(this.video);
        }
        
    }

    /**
     * @name _onPlaying
     * @description Keeps updating the progress and timer of the video
     * @method HeartyMediaPlayer
     */
    _onPlaying() {
        if (!this.video) {
            return;
        }
        let time = (this.video.currentTime/this.video.duration)*100;
        if (time.toString() == 'NaN') {
            return;
        }
        this.setState({
            progress : time
        })
    }

    /**
     * @name _onPlaying
     * @description Updates the progress and timer of the video while playing
     * @method HeartyMediaPlayer
     */
    _onEnded() {
        if (!this.video) {
            return;
        }
        let {onEndVideo} = this.props;
        this.setState({
            playing : false,
            replay: true
        })
        if (onEndVideo) {
            onEndVideo();
        }

        if (typeof this.video.loop != 'boolean' && this.state.loop) {
           this._play();
        }
    }

    /**
     * @name _forwaredVideo
     * @description Forwards the video by one frame and calls he onForwardVideo callback if provided
     * @method HeartyMediaPlayer
     */
    _forwaredVideo() {
        let {onForwardVideo} = this.props;
        this.video.currentTime += 1/30;
        if (onForwardVideo) {
            onForwardVideo(this.video);
        }
    }

    /**
     * @name _backwardVideo
     * @description Backwards the video by one frame and calls the onBackwardVideo callback if provided
     * @method HeartyMediaPlayer
     */
    _backwardVideo() {
        let {onBackwardVideo} = this.props;
        this.video.currentTime -= 1/30;
        if (onBackwardVideo) {
            onBackwardVideo(this.video);
        }
    }

    /**
     * @name _prepareVideoTimer
     * @description Prepares the video timer in sytanx running/total 
     * @method HeartyMediaPlayer
     */
    _prepareVideoTimer() {
        let video = this.video;
        return secondsToVideoTimeConverter(video.currentTime) + '/' + secondsToVideoTimeConverter(video.duration)
    }

    /**
     * @name _setupVolume
     * @description changes the video volume and calls the onVolumeChange callback if provided
     * @method HeartyMediaPlayer
     */
    _setupVolume(range) {
        let {volume} = this.state;

        if (window.innerWidth < 780) {
            if (volume > 0) {
                volume = 0;
            }
            else {
                volume = 5;
            }
            
            this.setState({
                volume
            })

            this.video.volume = volume > 1 ? 1 : 0;
            return;
        }

        
        let {onVolumeChange} = this.props;
        if (this.state.muted) {
            return;
        }

        if (this.state.volume == 1 && range == 1) {
            this.video.volume = 0;
            range = 0;
        }

        this.setState({
            volume : range
        });

        if (onVolumeChange) {
            onVolumeChange(this.video);
        }

        this.video.volume = range*0.2;
    }

    /**
     * @name _setupPlaybackRate
     * @description changes the video playbackrate and calls the onSpeedChange callback if provided
     * @method HeartyMediaPlayer
     */
    _setupPlaybackRate(rate) {

        let {onSpeedChange} = this.props;
        this.setState({
            playbackRate : rate,
            showPlaybackOptions: false
        });
        if (onSpeedChange) {
            onSpeedChange(this.video);
        }
        this.video.playbackRate = rate;
    }

    /**
     * @name _showPlaybackOptions
     * @description show the playbackoptions division on click on speed icon 
     * @method HeartyMediaPlayer
     */   
    _showPlaybackOptions() {
        this.setState({
            showPlaybackOptions: !this.state.showPlaybackOptions
        })
    }

    /**
     * @name _fixVideoTop
     * @description makes the video fixed top with 95% of documents width occupied and calls the onVideoFixedTop, onVideoExitFixedTop accordingly if provided
     * @method HeartyMediaPlayer
     */  
    _fixVideoTop() {
        let {onVideoFixedTop, onVideoExitFixedTop} = this.props;
        this.setState({
            fixedTop: !this.state.fixedTop
        });
        if (this.state.fixedTop) {
            if (onVideoFixedTop) {
                onVideoFixedTop(this.video);
            }
        }
        else {
            if (onVideoExitFixedTop) {
                onVideoExitFixedTop(this.video);
            }
        }
    }

    /**
     * @name _fixVideoTop
     * @description sets the video progress on drag by user
     * @method HeartyMediaPlayer
     * @param {*} e - Event on changing the process bar (Input)
     */
    _progressRangeHandler(e) {
        let range = Number(e.target.value);
        if (range.toString() == 'NaN') {
            return;
        }
        this.setState({
            progress : range
        })

        this.video.currentTime = this.video.duration * range/100;
    }

    /**
     * @name _deactivateFullScreen
     * @description deactivates the fullscreen mode and calls onExitFullScreen if provided
     * @method HeartyMediaPlayer
     */
    _deactivateFullScreen() {
        let {onExitFullScreen} = this.props;

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        this.setState({
            fullScreen : false
        })

        if (onExitFullScreen) {
            onExitFullScreen(this.video);
        }
    }

    /**
     * @name _activateFullScreen
     * @description activates the fullscreen mode and calls onFullScreen if provided
     * @method HeartyMediaPlayer
     */
    _activateFullScreen() {
        let {onFullScreen} = this.props;

        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement ) {  // current working methods

                let videoElement =  (this.props.isBodyFullScreen) ? document.body : document.getElementById(this.state.id)

                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                }
                else if (videoElement.msRequestFullscreen) {
                    videoElement.msRequestFullscreen();
                }
                else if (videoElement.mozRequestFullScreen) {
                    videoElement.mozRequestFullScreen();
                }
                else if (videoElement.webkitRequestFullScreen) {
                    videoElement.webkitRequestFullScreen();
                }

                this.setState({
                    fullScreen : true
                })

                if (onFullScreen) {
                    onFullScreen(this.video);
                }
        }
        else {
            this._deactivateFullScreen();
        }
    }

    
    /**
     * @name _exitHandler
     * @description window fullscreen exit handler which triggers on click ESC when video in fullscreen
     * @method HeartyMediaPlayer
     */
    _exitHandler(e){
        let {onExitFullScreen} = this.props;
        if(document.fullScreen === false || document.mozFullScreen === false || document.webkitIsFullScreen === false  || document.msFullscreenElement === null) {
            /* Run code on exit */
            this.setState({
                fullScreen: false
            })

            if (onExitFullScreen) {
                onExitFullScreen(this.video);
            }

            e.preventDefault();
        }
    }

    /**
     * @name _mouseOut
     * @description On mouse out will hides the video controls 
     * @method HeartyMediaPlayer
     */
    _mouseOut() {
        this.setState({
            mouseOver: false
        })
    }

    /**
     * @name _mouseOver
     * @description On mouse over will show the video controls 
     * @method HeartyMediaPlayer
     */
    _mouseOver() {
        this.setState({
            mouseOver: true
        })
    }

    /**
     * @name componentDidMount
     * @description When component mounts - Adding the events to the document
     * @method default
     */
    componentDidMount(){
        // Check preload video
        if (this.state.preload) {
            this._loadVideo();
        }
    
            // Check autoplay
        if (this.state.autoplay) {
            this._play();
        }

        if(this.props.onRef) {
            this.props.onRef(this);
        }

        let exitHandler = this._exitHandler.bind(this);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
    }
    
     /**
     * @name componentWillUnmount
     * @description When component unmounts - Removes the events added to the document
     * @method default
     */   
    componentWillUnmount(){
        let exitHandler = this._exitHandler.bind(this);
        document.removeEventListener('webkitfullscreenchange', exitHandler, false);
        document.removeEventListener('mozfullscreenchange', exitHandler, false);
        document.removeEventListener('fullscreenchange', exitHandler, false);
        document.removeEventListener('MSFullscreenChange', exitHandler, false);

        if(this.props.onRef) {
            this.props.onRef(undefined);
        }
     }

     preareVideoSource() {
        let sourceElem = '';
        if (this.state.src) {
            let src = this.state.src;
            let videoType = "video/";
            let splitArray = src.split('.');
            let type = splitArray[splitArray.length-1].toLowerCase();

            if (validVideoTypes.indexOf(type) > -1) {
                videoType += type;
                sourceElem = <source src={this.state.src} type={videoType} ref={(c) => {this.source = c}} />;
            }
        }
        return sourceElem;
    }
   
    // Renders the Component
    render() {
        
        let playPauseElem = <img src={play}/>;
        let playPauseFun = this._play.bind(this);
        let videoCurtainClass = 'video-curtain show';

        if (this.state.playing) {
            playPauseElem =  <img src={pause}/>;
            playPauseFun = this._pause.bind(this);
            videoCurtainClass = 'video-curtain';
        }

        if (this.state.replay) {
            playPauseElem =  <img src={replay}/>;
            playPauseFun = this._play.bind(this);
            videoCurtainClass = 'video-curtain show';
        }

        let videoCurtainStyle = {};

        if (this.state.poster && (this.state.replay || !this.state.started)) {
            videoCurtainStyle = {
                'background' : 'url('+this.state.poster+')'
            }
        }

        let videoControlsClassName = 'video-controls';
       
        let videoControlsWrappersClass = 'video-controls-wrapper';
        if (!this.state.mouseOver) {
            videoControlsWrappersClass += ' hidden';
        }

        let videoTimeInfo = (this.video) ? this._prepareVideoTimer(): '00:00/00:00';

        let volumeClassOne = (this.state.volume > 0) ? 'fill' : '';
        let volumeClassTwo = (this.state.volume >= 2) ? 'fill' : '';
        let volumeClassThree = (this.state.volume >= 3) ? 'fill' : '';
        let volumeClassFour = (this.state.volume >= 4) ? 'fill' : '';
        let volumeClassFive = (this.state.volume >= 5) ? 'fill' : '';

        let playbackRateLabel = (this.state.playbackRate) ? this.state.playbackRate+'x' : '';
        let playbackRateOptionsClass = (this.state.showPlaybackOptions) ? 'playback-rate-options show' : 'playback-rate-options';

        let heartyMediaPlayerClass = 'hearty-media-player';

        if (this.state.fixedTop) {
            heartyMediaPlayerClass += ' fixed';
        } 
       
        if (this.state.className) {
            heartyMediaPlayerClass += ' '+this.state.className;
        } 

        if(this.state.fullScreen) {
            heartyMediaPlayerClass += ' fullscreen';
        }

        let heartyMediaPlayerId = this.state.id;

        let fixedTopIcon = (this.state.fixedTop) ? fixedRemove : fixedTop;
       
        let heartyMediaPlayerClassStyle = {
            // width: '700px'
        }

        let fullScreenOption = (this.props.allowFullScreen) ? (
                <a href="javascript:;" className="control-option" onClick={this._activateFullScreen.bind(this)}>
                    <img src={fullscreen}/>
                </a>
            ) : '';

        let fixedTopOption = (this.props.allowFixedTop) ? (
            <a href="javascript:;" className="control-option fixed-top" onClick={this._fixVideoTop.bind(this)}>
                <img src={fixedTopIcon}/>
            </a>
        ) : '';
            
        let forwardOption = (this.props.allowForward) ? (
            <a href="javascript:;" className="control-option" onClick={this._forwaredVideo.bind(this)}>
                <img src={forward}/>
            </a>
            ) : '';

        let backwardOption = (this.props.allowBackward) ? (
            <a href="javascript:;" className="control-option" onClick={this._backwardVideo.bind(this)}>
                <img src={backward}/>
            </a>
        ) : '';

        let speedControlOptions = (this.props.allowSpeedControls) ? (
            <a href="javascript:;" className="control-option playback-rate">
                <div className="playback-rate-label" onClick={this._showPlaybackOptions.bind(this)}>{playbackRateLabel}</div>
                <div className={playbackRateOptionsClass}>
                    <span className="options-title">Speed</span>
                    <ul>
                        <li> <span onClick={() => this._setupPlaybackRate(0.5)}>0.5x</span> </li>
                        <li> <span onClick={() => this._setupPlaybackRate(1)}>1x</span> </li>
                        <li> <span onClick={() => this._setupPlaybackRate(1.25)}>1.25x</span> </li>
                        <li> <span onClick={() => this._setupPlaybackRate(2)}>2x</span> </li>
                    </ul>
                </div>
            </a>
        ) : '';

        let videoControlsComponent = (
            <div className={videoControlsClassName}>
                <div className={videoControlsWrappersClass}>
                    <div className="video-controls-section section-one">
                        <a href="javascript:;" className="control-option" onClick={playPauseFun}>{playPauseElem}</a>
                        {backwardOption}
                        {forwardOption}
                        <a href="javascript:;" className="control-option video-time-info">
                            {videoTimeInfo}
                        </a>
                    </div>
                    <div className="video-controls-section section-one">
                        {speedControlOptions}
                        <a href="javascript:;" className="control-option volume">
                            <div onClick={() => this._setupVolume(1)} className={volumeClassOne}></div>
                            <div onClick={() => this._setupVolume(2)} className={volumeClassTwo}></div>
                            <div onClick={() => this._setupVolume(3)} className={volumeClassThree}> </div>
                            <div onClick={() => this._setupVolume(4)} className={volumeClassFour}></div>
                            <div onClick={() => this._setupVolume(5)} className={volumeClassFive}></div>
                        </a>
                        {fixedTopOption}
                        {fullScreenOption}
                    </div> 
                </div>
                <div className="video-progress-tracker" 
                        ref={(c) => {this.videoprogress = c}}>
                        <div className="progress-elem">
                            <PrettyProgressbar 
                                percentage={this.state.progress} 
                                progressbarStyle={progressbarStyle}
                                progressStyle={progressStyle}
                                type='default'/>
                        </div>
                        <input type="range" 
                            min="1" 
                            max="100" 
                            value={this.state.progress} 
                            onChange={this._progressRangeHandler.bind(this)}
                            className="progressRange slider" 
                            id="progressRange"/>
                </div>
            </div>
        )

        let IOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

        if (IOS) {
            videoControlsComponent = null;
        }

        return (
            <div className={heartyMediaPlayerClass} 
                 id={heartyMediaPlayerId}
                 style={heartyMediaPlayerClassStyle} 
                 onMouseOut={() => this._mouseOut()} 
                 onMouseOver={() => this._mouseOver()}>
                <div className="video-wrapper">
                    <div className={videoCurtainClass} onClick={playPauseFun} style={videoCurtainStyle}>
                        <div className="video-curtain-icon">
                            {playPauseElem}
                        </div>
                    </div>
                    <video 
                        ref={(c) => {this.video = c}} 
                        onClick={playPauseFun} controls={IOS}>
                        {this.state.sourceElem}
                    </video>
                    {videoControlsComponent}
                </div>
            </div>
        )
    }
}

HeartyMediaPlayer.propTypes = propTypes;
HeartyMediaPlayer.defaultProps = defaultProps;

export default HeartyMediaPlayer;