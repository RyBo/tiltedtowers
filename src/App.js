import React, { Component } from 'react';
import { Header,Container } from "semantic-ui-react";
import axios from 'axios';
import qs from 'qs';

import SpotifyBase64ID from "./features/auth/SpotifyBase64ID";

import MenuContainer from "./features/MenuContainer";
import Playlist from "./features/playlist/Playlist";
import Songs from "./features/songs/Songs";

import './App.css';

const Custom = () => <div>Custom Playlists</div>;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playlists : [],
		};
	}

	componentWillMount() {
		this.getAuthToken();
	}

	getAuthToken = (name) => {
		const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : SpotifyBase64ID};
		const data = qs.stringify({'grant_type' : 'client_credentials'});

		axios.post('/authenticate', data, {headers: headers})
			.then((response) => {
				console.log(response.data['access_token']);
				this.setState({SpotifyAuthToken : response.data['access_token']}, () => {
					this.getPlaylists();
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}

	getPlaylists = (name) => {
		const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + this.state.SpotifyAuthToken};
		console.log(headers);

		axios.get('/api/users/rabidowl/playlists', {headers: headers})
			.then((response) => {
				console.log(response.data['items']);
				const playlists = response.data['items'].map(function(item, index) {

					return (
						JSON.stringify(item)
					);
				});

			
				this.setState({playlists : playlists });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	render() {
		const songs = (<Songs />);
		const tabs = [
				{name : "artists", label : "Artists", component : Playlist, items : this.state.playlists, },
				{name : "genres",  label : "Genres",  component : Playlist, items : this.state.playlists, },
				{name : "custom",  label : "Custom",  component : Custom, items: this.state.playlists, },
		];

		return (
			<div className="App">
				<div className="App-header">
					<Header inverted as="h1">tilted towers</Header>
				</div>
				<Container width='60%'>
					<MenuContainer tabs={tabs} songs={songs} size="massive" />
				</Container>
			</div>
		);
	}
}

export default App;
