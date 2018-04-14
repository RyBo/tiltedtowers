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
//        const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + this.state.SpotifyAuthToken};

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

    toggleSearchVisibility = () => this.setState({ searchVisible : !this.state.searchVisible});

    render() {
        const visible = this.state.searchVisible;

        return (
            <div className="App">

            <HeaderMenu visible={visible} onClick={this.toggleSearchVisibility} />

            <Container>
            <MenuContainer playlists={this.state.playlists} songs={this.state.songs} loadSongs={this.getSongs} size="massive" />
            </Container>
            </div>
        );
    }
}

export default App;
