import React from 'react';
import PrettyProgressbar from 'pretty-progressbar';
import {
    secondsToVideoTimeConverter
} from './helpers';
require('./app.scss');

class EliteMediaPlayer extends React.Component {
    constructor(context, props) {
        super(context, props);

        let {src} = this.props;

        this.state = {
            url : src,
            playing : false,
            replay : false,
            progress : 0,
            fullScreen : false,
            volume : 5,
            playbackRate: 1,
            showPlaybackOptions: false,
            fixedTop: false
        }

        this.video = null;
    }

    _play() {
        this.video.play();
        this.setState({
            playing : true,
            replay : false
        });

        this.video.ontimeupdate = () => {
            this._onPlaying();
        }

        this.video.onended = () => {
            this._onEnded();
        }
    }

    _pause() {
        this.video.pause();
        this.setState({
            playing : false
        })
    }

    _onPlaying() {
        let time = (this.video.currentTime/this.video.duration)*100;
        this.setState({
            progress : time
        })
    }

    _onEnded() {
        this.setState({
            playing : false,
            replay: true
        })
    }

    _forwaredVideo() {
        this.video.currentTime += 1/30;
    }

    _backwardVideo() {
        this.video.currentTime -= 1/30;
    }

    _prepareVideoTimer() {
        let video = this.video;
        return secondsToVideoTimeConverter(video.currentTime) + '/' + secondsToVideoTimeConverter(video.duration)
    }

    _setupVolume(range) {
        this.setState({
            volume : range
        });
        this.video.volume = range*0.2;
    }

    _setupPlaybackRate(rate) {
        this.setState({
            playbackRate : rate,
            showPlaybackOptions: false
        });
        this.video.playbackRate = rate;
    }

    _showPlaybackOptions() {
        this.setState({
            showPlaybackOptions: true
        })
    }

    _fixVideoTop() {
        this.setState({
            fixedTop: !this.state.fixedTop
        })
    }

    _progressRangeHandler(e) {
        let range = Number(e.target.value);
        this.setState({
            progress : range
        })

        this.video.currentTime = this.video.duration * range/100;
    }

    _deactivateFullScreen() {
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
    }

    _activateFullScreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement ) {  // current working methods

                if (this.video.requestFullscreen) {
                    this.video.requestFullscreen();
                }
                else if (this.video.msRequestFullscreen) {
                    this.video.msRequestFullscreen();
                }
                else if (this.video.mozRequestFullScreen) {
                    this.video.mozRequestFullScreen();
                }
                else if (this.video.webkitRequestFullScreen) {
                    this.video.webkitRequestFullScreen();
                }

                this.setState({
                    fullScreen : true
                })
        }
        else {
            this._deactivateFullScreen();
        }
    }

    _exitHandler(e){
        if(document.fullScreen === false || document.mozFullScreen === false || document.webkitIsFullScreen === false  || document.msFullscreenElement === null) {
            /* Run code on exit */
            this.setState({
                fullScreen: false
            })
            e.preventDefault();
        }
    }

    componentDidMount(){
        let exitHandler = this._exitHandler.bind(this);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
    }
    
    componentWillUnmount(){
        let exitHandler = this._exitHandler.bind(this);
        document.removeEventListener('webkitfullscreenchange', exitHandler, false);
        document.removeEventListener('mozfullscreenchange', exitHandler, false);
        document.removeEventListener('fullscreenchange', exitHandler, false);
        document.removeEventListener('MSFullscreenChange', exitHandler, false);
     }


    render() {
        let sourceElem = <source src={this.state.url} type="video/mp4"/>;
        let playPauseElem = <img src="../assets/play.png"/>;
        let playPauseFun = this._play.bind(this);
        let videoCurtainClass = 'video-curtain show';

        if (this.state.playing) {
            playPauseElem =  <img src="../assets/pause.png"/>;
            playPauseFun = this._pause.bind(this);
            videoCurtainClass = 'video-curtain';
        }

        if (this.state.replay) {
            playPauseElem =  <img src="../assets/replay.png"/>;
            playPauseFun = this._play.bind(this);
            videoCurtainClass = 'video-curtain show';
        }

        let progressbarStyle = {
            'background' : '#E5E5E5',
            'width' : '100%',
            'height' : '5px',
        }

        let progressStyle = {
            'background' : 'limegreen'
        }

        let videoControlsClassName = (this.state.fullScreen) ? 'video-controls fullscreen-mode' : 'video-controls';
        
        let videoTimeInfo = (this.video) ? this._prepareVideoTimer(): '00:00/00:00';

        let volumeClassOne = (this.state.volume >= 0) ? 'fill' : '';
        let volumeClassTwo = (this.state.volume >= 2) ? 'fill' : '';
        let volumeClassThree = (this.state.volume >= 3) ? 'fill' : '';
        let volumeClassFour = (this.state.volume >= 4) ? 'fill' : '';
        let volumeClassFive = (this.state.volume >= 5) ? 'fill' : '';

        let playbackRateLabel = (this.state.playbackRate) ? this.state.playbackRate+'x' : '';
        let playbackRateOptionsClass = (this.state.showPlaybackOptions) ? 'playback-rate-options show' : 'playback-rate-options';

        let eliteMediaPlayerClass = (this.state.fixedTop) ? 'elite-media-player fixed' : 'elite-media-player';
        let fixedTopIcon = (this.state.fixedTop) ? '../assets/fixed-remove.png' : '../assets/fixed-top.png';
       
        return (
            <div className={eliteMediaPlayerClass}>
                <div className="video-wrapper">
                    <div className={videoCurtainClass} onClick={playPauseFun}></div>
                    <video 
                        ref={(c) => {this.video = c}} 
                        onClick={playPauseFun} >
                        {sourceElem}
                    </video>
                    <div className={videoControlsClassName}>
                        <div className="video-controls-wrapper">
                            <div className="video-controls-section section-one">
                                <a href="javascript:;" className="control-option" onClick={playPauseFun}>{playPauseElem}</a>
                                <a href="javascript:;" className="control-option" onClick={this._backwardVideo.bind(this)}>
                                    <img src="../assets/backward.png"/>
                                </a>
                                <a href="javascript:;" className="control-option" onClick={this._forwaredVideo.bind(this)}>
                                    <img src="../assets/forward.png"/>
                                </a>
                                <a href="javascript:;" className="control-option video-time-info">
                                    {videoTimeInfo}
                                </a>
                            </div>
                            <div className="video-controls-section section-one">
                                <a href="javascript:;" className="control-option playback-rate">
                                    <div className="playback-rate-label" onClick={this._showPlaybackOptions.bind(this)}>{playbackRateLabel}</div>
                                    <div className={playbackRateOptionsClass}>
                                        <span className="options-title">Speed</span>
                                        <ul>
                                            <li> <span onClick={() => this._setupPlaybackRate(0.25)}>0.25x</span> </li>
                                            <li> <span onClick={() => this._setupPlaybackRate(0.5)}>0.5x</span> </li>
                                            <li> <span onClick={() => this._setupPlaybackRate(1)}>1x</span> </li>
                                            <li> <span onClick={() => this._setupPlaybackRate(2)}>2x</span> </li>
                                        </ul>
                                    </div>
                                </a>
                                <a href="javascript:;" className="control-option volume">
                                    <div onClick={() => this._setupVolume(1)} className={volumeClassOne}></div>
                                    <div onClick={() => this._setupVolume(2)} className={volumeClassTwo}></div>
                                    <div onClick={() => this._setupVolume(3)} className={volumeClassThree}> </div>
                                    <div onClick={() => this._setupVolume(4)} className={volumeClassFour}></div>
                                    <div onClick={() => this._setupVolume(5)} className={volumeClassFive}></div>
                                </a>
                                <a href="javascript:;" className="control-option" onClick={playPauseFun}>
                                    <img src="../assets/settings.png"/>
                                </a>
                                <a href="javascript:;" className="control-option" onClick={this._fixVideoTop.bind(this)}>
                                    <img src={fixedTopIcon}/>
                                </a>
                                <a href="javascript:;" className="control-option" onClick={this._activateFullScreen.bind(this)}>
                                    <img src="../assets/fullscreen.png"/>
                                </a>
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
                </div>
            </div>
        )
    }
}

export default EliteMediaPlayer;