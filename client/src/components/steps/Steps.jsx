import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';

export default class Steps extends Component {

    render() {
        const steps = [
            { key: 'playlist', name: 'playlist', icon: 'spotify', title: 'Playlist', description: this.props.playlist, active : this.props.activeStep === 'playlist',  onClick : this.props.onClick},
            { key: 'song', name: 'song', icon: 'music', title: 'Song', description: this.props.song, active : this.props.activeStep === 'song', disabled : this.props.songDisabled, onClick: this.props.onClick},
            { key: 'learn', name: 'learn', icon: 'pied piper alternate', title: 'Learn', description: '', active : this.props.activeStep === 'learn', disabled : this.props.learnDisabled, onClick: this.props.onClick},
        ];
        return (
            <Step.Group unstackable widths={3} items={steps} />
        );
    }
}
