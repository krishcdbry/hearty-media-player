import React from 'react';
import {render} from 'react-dom';
import HeartyMediaPlayer from '../../dist/index';

class App extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    onLoadVideoCallback (video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video Loaded", video);
    }

    onStartVideoCallback (video) {
       // video - video element returned from HeartyMediaPlayer
       console.log("Video Started", video);
    }

    onEndVideoCallback (video) {
      // video - video element returned from HeartyMediaPlayer
       console.log("Video Ended", video);
    }

    onPauseVideoCallback (video) {
       // video - video element returned from HeartyMediaPlayer
       console.log("Video Paused", video);
    }

    onForwardVideoCallback(video) {
       // video - video element returned from HeartyMediaPlayer
       console.log("Video forwaded", video);
    }

    onBackwardVideoCallback(video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video backwarded", video);
     }

    onSpeedChangeCallback(video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video playback Speed changed", video);
     }

    onVolumeChangeCallback(video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video volume changed", video);
    }

    onVideoFixedTopCallback(video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video poped fixed to top of window", video);
    }

    onVideoExitFixedTopCallback(video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video exit from fixed top of window", video);
    }

    onFullScreenCallback (video) {
        // video - video element returned from HeartyMediaPlayer
        console.log("Video FullScreen", video);
    }

    onExitFullScreenCallback (video) {
       // video - video element returned from HeartyMediaPlayer
       console.log("Video Exitfullscreen", video);
    }

    render() {

        return (
            <div className="app">
                <h1>Hearty Media Player</h1>
                <div className="videos">
                    <div className="section section-one">
                        <h2> Deafult</h2>
                        <HeartyMediaPlayer 
                        src="https://www.w3schools.com/html/movie.ogg"/>
                    </div>

                    <div className="section section-one">
                        <h2> Preload </h2>
                        <HeartyMediaPlayer 
                        preload={true}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"/>
                    </div>

                    <div className="section section-one">
                        <h2> Autoplay </h2>
                        <HeartyMediaPlayer 
                        autoplay={true}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"/>
                    </div>

                    <div className="section section-one">
                        <h2> Muted , Poster </h2>
                        <HeartyMediaPlayer 
                        poster="https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/INTRO_AvengersAgeUltron_FINAL.jpg"
                        muted={true}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"/>
                    </div>

                    <div className="section section-one">
                        <h2> Events (Loop, Poster, Preload, Autoplay etc) </h2>
                        <i>Check console for event logging</i>
                        <br/><br/>
                        <HeartyMediaPlayer 
                            src="https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4"
                            id="my-video"
                            className="my-video-class"
                            poster="data:image/jpeg;base64,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"
                            preload={true}
                            autoplay={true}
                            muted={false}
                            loop={true}
                            allowFullScreen={true}
                            allowFullScreen={true}
                            allowForward={true}
                            allowBackward={true}
                            allowFixedTop={true}
                            allowSpeedControls={true}
                            onLoadVideo={this.onLoadVideoCallback.bind(this)}
                            onStartVideo={this.onStartVideoCallback.bind(this)}
                            onPauseVideo={this.onPauseVideoCallback.bind(this)}
                            onEndVideo={this.onEndVideoCallback.bind(this)}
                            onForwardVideo={this.onForwardVideoCallback.bind(this)}
                            onBackwardVideo={this.onBackwardVideoCallback.bind(this)}
                            onSpeedChange={this.onSpeedChangeCallback.bind(this)}
                            onVolumeChange={this.onVolumeChangeCallback.bind(this)}
                            onVideoFixedTop={this.onVideoFixedTopCallback.bind(this)}
                            onVideoExitFixedTop={this.onVideoExitFixedTopCallback.bind(this)}
                            onFullScreen={this.onFullScreenCallback.bind(this)}
                            onExitFullScreen={this.onExitFullScreenCallback.bind(this)}/>
                    </div>
           
            </div>
            </div>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)