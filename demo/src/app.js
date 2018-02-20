import React from 'react';
import {render} from 'react-dom';
import HeartyMediaPlayer from '../../dist/index';

class App extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    onVideoLoadCallback (video) {
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
        let style = {width: '600px'};
        
        return (
            <div className="app">
                <h1>Hearty Media Player</h1>
                <div style={style}>

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
                    onLoadVideo={this.onVideoLoadCallback.bind(this)}
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
                    onExitFullScreen={this.onExitFullScreenCallback.bind(this)}
                    style={style}/>

                <br/><br/><br/>

                <HeartyMediaPlayer 
                    autoplay={true}
                    muted={true}
                    src="https://www.w3schools.com/html/movie.ogg"
                    poster="https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/INTRO_AvengersAgeUltron_FINAL.jpg"/>
              
              <br/><br/><br/>

              <HeartyMediaPlayer 
                    preload={true}
                    allowFullScreen={false}
                    allowFixedTop={false}
                    src="https://www.w3schools.com/html/mov_bbb.mp4"/>
              <br/><br/>

              <HeartyMediaPlayer 
                    autoplay={true}
                    muted={true}
                    allowForward={false}
                    allowBackward={false}
                    allowSpeedControls={false}
                    src="https://www.w3schools.com/html/movie.ogg"
                    poster="https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/INTRO_AvengersAgeUltron_FINAL.jpg"/>
              
               </div>
            </div>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)