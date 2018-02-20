# Hearty Media Player (hearty-media-player) [![NPM version](https://img.shields.io/npm/v/hearty-media-player.svg)](https://www.npmjs.com/package/hearty-media-player)
[![Downloads](http://img.shields.io/npm/dm/hearty-media-player.svg)](https://npmjs.org/package/hearty-media-player)
A React media component which provides video player with custom video controls, Which can play videos by receving URLs as input. 


## INDEX

* [Getting Started](#getting-started)
* [Usage](#usage)
* Props
  * [General](#general)
  * [Functional](#functional-props)
  * [Control](#control-props)
  * [Event](#event-props)
  * [Style](#styling-props)
* Examples  
  * [Example 1](#example-1)
  * [Example 2](#example-2)
  * [Example 3](#example-3)
* [Author](#Author)
* [Demo](#demo)
* [License](#license)



## Getting Started


```javascript
npm i hearty-media-player 
```

or

```javascript
npm install hearty-media-player 
```

# Props


## General Props

Name         | Required | Type   | Description |
-------------|----------|--------|--------------
`src`        | Yes      | string | Source url fo the video to be loaded  
`id`         | No       | string | An Id for the player component.
`className`  | No       | string | A custom classname for the player component
`poster`     | No       | string | Url to the poster image to be shown before video plays


## Functional Props

Name          | Required | Type    | Description |
--------------|----------|---------|--------------
`preload`     | No       | boolean | Determines weather the video loads by default   
`autoplay`    | No       | boolean | Determines weather the video loads & plays by default
`muted`       | No       | boolean | Determines weather the video is muted completely
`loop`        | No       | boolean | Determines weather the video should be looped


## Control Props

Name                 | Required | Type    | Description |
---------------------|----------|---------|--------------
`allowFullScreen`    | No       | boolean | Flag to allow fullscreen mode 
`allowForward`       | No       | boolean | Flag to show/allow forward video
`allowBackward`      | No       | boolean | Flag to show/allow backward video
`allowFixedTop`      | No       | boolean | Flag to show/allow video popped top of the window
`allowSpeedControls` | No       | boolean | Flag to change playback rate of the video



## Event Props

Name                  | Required | Type       | Description |
----------------------|----------|------------|--------------
`onVideoLoad`         | No       | function   | A function that runs when video loads and returns video element * `onVideoLoad(video)` -  `video` - This is the video element passed back from hearty media player.  
`onStartVideo`        | No       | function   | A function that runs when video starts playing and returns video element * `onStartVideo(video)` -  `video` - This is the video element passed back from hearty media player. 
`onEndVideo`          | No       | function   | A function that runs when video completed and returns video element * `onEndVideo(video)` -  `video` - This is the video element passed back from hearty media player. 
`onPauseVideo`        | No       | function   | A function that runs when video paused and returns video element * `onPauseVideo(video)` -  `video` - This is the video element passed back from hearty media player. 
`onForwardVideo`      | No       | function   | A function that runs when video forwaded and returns video element * `onForwardVideo(video)` -  `video` - This is the video element passed back from hearty media player. 
`onBackwardVideo`     | No       | function   | A function that runs when video backwarded and returns video element * `onBackwardVideo(video)` -  `video` - This is the video element passed back from hearty media player. 
`onSpeedChange`       | No       | function   | A function that runs when video playback speed changes and returns video element * `onSpeedChange(video)` -  `video` - This is the video element passed back from hearty media player. 
`onVolumeChange`      | No       | function   | A function that runs when video volume changes and returns video element * `onVolumeChange(video)` -  `video` - This is the video element passed back from hearty media player. 
`onVideoFixedTop`     | No       | function   | A function that runs when video pops fixed to top of window and returns video element. * `onVideoFixedTop(video)` -  `video` - This is the video element passed back from hearty media player. 
`onVideoExitFixedTop` | No       | function   | A function that runs when video exits from fixed top of window and returns video element * `onVideoExitFixedTop(video)` -  `video` - This is the video element passed back from hearty media player. 
`onFullScreen`        | No       | function   | A function that runs when video enters fullscreen mode and returns video element * `onFullScreen(video)` -  `video` - This is the video element passed back from hearty media player. 
`onExitFullScreen`    | No       | function   | A function that runs when video exists fullscreen mode and returns video element * `onExitFullScreen(video)` -  `video` - This is the video element passed back from hearty media player. 

## Styling props

Name          | Required | Type     | Description |
--------------|----------|----------|--------------
`style`       | No       | Object   |  Styling player component 


# Usage


## Example 1

```javascript
import React from 'react';
import {render} from 'react-dom';
import HeartyMediaPlayer from '../../dist/index';

class App extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    render() {
        return (
            <div className="app">
                <h1>Hearty Media Player</h1>
                <HeartyMediaPlayer 
                    className="media-player"
                    id="5456"
                    src="https://www.w3schools.com/html/movie.ogg"
                    poster="https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/INTRO_AvengersAgeUltron_FINAL.jpg"/>
              
            </div>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)
```

## Example 2

```javascript
import React from 'react';
import {render} from 'react-dom';
import HeartyMediaPlayer from '../../dist/index';

class App extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    render() {
        return (
            <div className="app">
                <h1>Hearty Media Player</h1>
                <HeartyMediaPlayer 
                    autoplay={true}
                    muted={true}
                    src="https://www.w3schools.com/html/movie.ogg"
                    preload={true}
                    loop={true}
                    />
            </div>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)
```

## Example 3

```javascript
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
                </div>
            </div>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)
```


## Author
Krishcdbry (krishcdbry@gmail.com)

## Demo
Click here (https://krishcdbry.github.io/hearty-media-player/demo/)

## License
MIT @[krishcdbry](krishcdbry.com)
