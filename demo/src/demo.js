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
                        <h2> Deafult (Src, Poster)</h2>
                        <HeartyMediaPlayer 
                        src="https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4"
                        poster="http://camendesign.com/code/video_for_everybody/poster.jpg"/>
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
                        <h2> Muted </h2>
                        <HeartyMediaPlayer 
                        autoplay={true}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"/>
                    </div>

                    <div className="section section-one">
                        <h2> Events </h2>
                        <br/>
                        <i>Check console for event logging</i>
                        <HeartyMediaPlayer 
                            src="https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4"
                            id="my-video"
                            className="my-video-class"
                            poster="http://camendesign.com/code/video_for_everybody/poster.jpg"
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
                            isBodyFullScreen={true}
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