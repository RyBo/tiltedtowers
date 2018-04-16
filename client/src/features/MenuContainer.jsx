import React, { Component } from "react";
import { Step, Segment } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'qs';

import Playlists from './playlists/Playlists';
import Songs from './songs/Songs';
import Learn from './learn/Learn';

export default class MenuContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistActive : true,
            songActive : false,
            learnActive : false,
            songDisabled : true,
            learnDisabled : true,
            activeStep : 'playlist',
            playlist : 'Choose Playlist',
            playlistHref : '',
            artist : '',
            song : 'Select Song',
            videos : [],
        };
    }

    handlePlaylistClick = (name,href) => {
        this.setState({
            playlist : name,
            playlistHref : href,
            activeStep : 'song',
            songDisabled : false,
        }, () => {
        this.props.loadSongs(href);
        })
    }

    handleSongClick = (song,artist) => {
        this.setState({
            song : song,
            artist: artist,
            activeStep : 'learn',
            learnDisabled : false
        }, () => {
            this.searchYoutube(this.state.song,this.state.artist);
        })
    }

    handleStepClick = (e, {name}) => {
        this.setState({
            activeStep : name
        });
    }

    searchYoutube = (song,artist) => {

        const headers = {'Content-Type' : 'application/x-www-form-urlencoded'};
        const body = qs.stringify({'instrument' : this.props.instrument, 'artist' : artist, 'song' : song});

        axios.post('/api/youtube', body, {headers:headers})
        .then((response) => {
            const videos = response.data['items'].map(function(item, index) {
                return (JSON.stringify(item));
            });
            this.setState({ videos : videos });
        })
        .catch((error) => {
            console.log(error);
        });
    }


    render() {
        const activeStep = this.state.activeStep;
        const {playlists, songs} = this.props;
        const videos = this.state.videos;
        const steps = [ 
            { key: 'playlist', name: 'playlist', icon: 'spotify', title: 'Playlist', description: this.state.playlist, active : activeStep === 'playlist',  onClick : this.handleStepClick},
            { key: 'song', name: 'song', icon: 'music', title: 'Song', description: this.state.song, active : activeStep === 'song', disabled : this.state.songDisabled, onClick: this.handleStepClick},
            { key: 'learn', name: 'learn', icon: 'pied piper alternate', title: 'Learn', description: '', active : activeStep === 'learn', disabled : this.state.learnDisabled, onClick: this.handleStepClick},
        ];

        return (
            <div>
                <Step.Group unstackable widths={3} items={steps} />
                    <Segment raised color="purple">
                        <Playlists visible={activeStep === 'playlist'} playlists={playlists} onClick={this.handlePlaylistClick}/>
                        <Songs visible={activeStep === 'song'} songs={songs} onClick={this.handleSongClick} />
                        <Learn visible={activeStep === 'learn'} videos={videos} onClick={this.handleSongClick} />
                    </Segment>
            </div>
        );
    }
}
