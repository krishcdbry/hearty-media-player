import React from 'react';
import {render} from 'react-dom';
import EliteMediaPlayer from '../../dist/index';

class App extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    render() {
        return (
            <div className="app">
                <h1>Elite Video Player</h1>
                <EliteMediaPlayer src="https://www.w3schools.com/html/mov_bbb.mp4"/>
               
            </div>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)