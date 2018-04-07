import React, { Component } from 'react';
import { Menu, Icon, Input, Container, Transition } from "semantic-ui-react";
import axios from 'axios';
import qs from 'qs';

import SpotifyBase64ID from "./features/auth/SpotifyBase64ID";
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
		this.getAuthToken();
	}

	getAuthToken = (name) => {
		const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : SpotifyBase64ID};
		const data = qs.stringify({'grant_type' : 'client_credentials'});

		axios.post('/authenticate', data, {headers: headers})
			.then((response) => {
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
		const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + this.state.SpotifyAuthToken};
		axios.get('/api/' + href, {headers: headers})
			.then((response) => {
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

	toggleSearchVisibility = () => this.setState({ searchVisible : !this.state.searchVisible});

	render() {
		const visible = this.state.searchVisible;

		return (
			<div className="App">

      <Menu text>
        <Menu.Item className="header-title" name='titled towers'/>
        <Menu.Menu position='right'>
          <Menu.Item>
      			<Transition animation="slide left" visible={visible}>
	            <Input placeholder='Search Spotify...' />
      			</Transition>
      			<Icon name='search' onClick={this.toggleSearchVisibility} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Container>
					<MenuContainer playlists={this.state.playlists} songs={this.state.songs} loadSongs={this.getSongs} size="massive" />
			</Container>
			</div>
		);
	}
}

export default App;
