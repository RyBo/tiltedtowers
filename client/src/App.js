import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import axios from 'axios';

import HeaderMenu from "./features/HeaderMenu";
import MenuContainer from "./features/MenuContainer";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchVisible : false,
            instrument : 'guitar',
            playlist : '',
            song : '',
            playlists : [],
            songs : [],
        };
    }

    componentWillMount() {
        this.getPlaylists();
    }

    getPlaylists = (name) => {

        axios.get('/api/spotify/playlists')
            .then((response) => {
                const playlists = response.data['items'].map(function(item, index) {
                    return (
                        JSON.stringify(item)
                    );
                });
                this.setState({ playlists : playlists });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getSongs = (href) => {
        console.log(href);

        axios.get('/api/spotify' + href)
            .then((response) => {
                const songs = response.data['items'].map(function(item, index) {
                    return (JSON.stringify(item));
                });
                this.setState({ songs : songs });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getSearchResults = (query) => {
        console.log(query);
        axios.get('/api/spotify/search/'+query)
            .then((response) => {
                const albums = response.data['items']['albums'].map(function(item, index) {
                    return (JSON.stringify(item));
                });
                const artists = response.data['items']['artists'].map(function(item, index) {
                    return (JSON.stringify(item));
                });
                const playlists = response.data['items']['playlists'].map(function(item, index) {
                    return (JSON.stringify(item));
                });
                 const songs = response.data['items']['songs'].map(function(item, index) {
                    return (JSON.stringify(item));
                });
                
            })
            .catch((error) => {
                console.log(error);
            });
    }

    toggleInstrument = (instrument) => this.setState({ instrument : instrument });

    render() {
        const visible = this.state.searchVisible;

        return (
            <div className="App">
                <HeaderMenu onClick={this.toggleInstrument} />

                <Container>
                    <MenuContainer instrument={this.state.instrument} playlists={this.state.playlists} songs={this.state.songs} loadSongs={this.getSongs} size="massive" />
                </Container>
            </div>
        );
    }
}

export default App;
