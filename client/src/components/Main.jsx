import React, { Component } from "react";
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'qs';

import Steps from './steps/Steps';
import Playlists from './playlists/Playlists';
import Songs from './songs/Songs';
import Learn from './learn/Learn';

export default class Main extends Component {
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
        const playlist = this.state.playlist;
        const song = this.state.song;
        const songDisabled = this.state.songDisabled;
        const learnDisabled = this.state.learnDisabled;


        const {playlists, songs} = this.props;
        const videos = this.state.videos;
        return (
            <div>
                <Steps activeStep={activeStep} playlist={playlist} song={song} songDisabled={songDisabled} learnDisabled={learnDisabled} onClick={this.handleStepClick} />
                <Segment raised color="purple">
                    <Playlists visible={activeStep === 'playlist'} playlists={playlists} onClick={this.handlePlaylistClick} />
                    <Songs visible={activeStep === 'song'} songs={songs} onClick={this.handleSongClick} />
                    <Learn visible={activeStep === 'learn'} videos={videos} onClick={this.handleSongClick} />
                </Segment>
            </div>
        );
    }
}
