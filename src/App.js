import React, { Component } from 'react';
import { Header,Container } from "semantic-ui-react";
import axios from 'axios';
import qs from 'qs';

import SpotifyBase64ID from "./features/auth/SpotifyBase64ID";
import MenuContainer from "./features/MenuContainer";

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playlist : '',
			song : '',
			playlists : [],
			songs : [],
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

		axios.get('/api/users/rabidowl/playlists', {headers: headers})
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
		const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + this.state.SpotifyAuthToken};
		axios.get('/api/' + href, {headers: headers})
			.then((response) => {
				console.log(response.data['items']);
				const songs = response.data['items'].map(function(item, index) {

					return (
						JSON.stringify(item)
					);
				});

			
				this.setState({ songs : songs });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	render() {

		return (
			<div className="App">
				<div className="App-header">
					<Header inverted as="h1">tilted towers</Header>
				</div>
				<Container width='60%'>
					<MenuContainer playlists={this.state.playlists} songs={this.state.songs} loadSongs={this.getSongs} size="massive" />
				</Container>
			</div>
		);
	}
}

export default App;
