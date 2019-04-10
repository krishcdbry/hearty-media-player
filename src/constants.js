import PropTypes from 'prop-types';

const propTypes = {
    src : PropTypes.string.isRequired,         // Source url fo the video to be loaded 
    id : PropTypes.string,                     // An Id for the player component.
    className : PropTypes.string,              // A custom classname for the player component
    poster : PropTypes.string,                 // Url to the poster image to be shown before video plays

    preload : PropTypes.bool,                  // Determines weather the video loads by default
    autoplay : PropTypes.bool,                 // Determines weather the video loads & plays by default
    muted : PropTypes.bool,                    // Determines weather the video is muted completely
    loop : PropTypes.bool,                     // Determines weather the video should be looped

    allowFullScreen : PropTypes.bool,          // Flag to allow fullscreen mode
    allowForward : PropTypes.bool,             // Flag to show/allow forward video
    allowBackward : PropTypes.bool,            // Flag to show/allow backward video
    allowFixedTop : PropTypes.bool,            // Flag to show/allow video popped top of the window
    allowSpeedControls : PropTypes.bool,       // Flag to change playback rate of the video

    onLoadVideo : PropTypes.func,              // A function that runs when video loads and returns video element
    onStartVideo : PropTypes.func,             // A function that runs when video starts playing and returns video element
    onEndVideo : PropTypes.func,               // A function that runs when video completed and returns video element
    onPauseVideo : PropTypes.func,             // A function that runs when video paused and returns video element
    onErrorVideo : PropTypes.func,             // A function that runs when video source error and returns video element
    onForwardVideo : PropTypes.func,           // A function that runs when video forwaded and returns video element
    onBackwardVideo : PropTypes.func,          // A function that runs when video backwarded and returns video element
    onSpeedChange : PropTypes.func,            // A function that runs when video playback speed changes and returns video element
    onVolumeChange : PropTypes.func,           // A function that runs when video volume changes and returns video element
    onVideoFixedTop : PropTypes.func,          // A function that runs when video pops fixed to top of window and returns video element
    onVideoExitFixedTop : PropTypes.func,      // A function that runs when video exits from fixed top of window and returns video element
    onFullScreen : PropTypes.func,             // A function that runs when video enters fullscreen mode and returns video element
    onExitFullScreen : PropTypes.func,         // A function that runs when video exists fullscreen mode and returns video element
    onRef : PropTypes.func,                    // A function that runs when this

    style : PropTypes.object                   // Styling player component
   
}

const validVideoTypes = [
    'mp4',
    'webm',
    'ogg'
]

const defaultProps = {
    preload : true,
    autoplay:  false,
    muted : false,
    loop : false,
    allowFullScreen : true,
    allowForward : true,
    allowBackward : true,
    allowFixedTop : true,
    allowSpeedControls : true
}

const progressbarStyle = {
    'background' : '#E5E5E5',
    'width' : '100%',
    'height' : '5px',
}

const progressStyle = {
    'background' : 'limegreen'
}

export {
    propTypes,
    validVideoTypes,

    progressbarStyle,
    progressStyle,

    defaultProps
}