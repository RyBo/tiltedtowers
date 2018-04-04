import React, { Component } from "react";
import { Step } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'qs';

import TabBar from "./tabs/TabBar";
import SpotifyBase64ID from "./auth/SpotifyBase64ID";

export default class MenuContainer extends Component {
    constructor(props) {
        super(props);
        const {tabs = [{name : null}]} = props;
        const firstTab = tabs[0];

        this.state = {
            currentTab : firstTab.name,
          	playlistActive : true,
          	songActive : false,
            learnActive : false,
            songDisabled : true,
            learnDisabled : true,

            playlist : 'Choose a Playlist',
            song : 'Select a Song',

            SpotifyAuthToken : '',

          	playlists : '[]',
        };
    }

/*  	componentWillMount() {
  		this.getAuthToken();
  	}
*/

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

			axios.get('/api/users/11166007198/playlists', {headers: headers})
				.then((response) => {
					console.log(response.data['items']);
					this.setState({playlists : response.data['items']});

				})
				.catch((error) => {
					console.log(error);
				})
  	}

    onTabClick = (name) => {
        this.setState({
        	currentTab : name,
        });
    }

  	onPlaylistClick = (name) => {
  		this.setState({
				playlist : name,

				playlistActive : false,
				songActive : true,
				songDisabled : false,

  		});
  	}

  	onSongClick = (name) => {
  		this.setState({
				song : name,

  			songActive : false,
  			learnActive : true,
  			learnDisabled : false,
  		});
  	}

    render() {
        const {tabs, songs, ...otherProps} = this.props;
        const currentTab = this.state.currentTab;
				const steps = [ 
				  { key: 'playlist', icon: 'spotify', title: 'Playlist', description: this.state.playlist, active : this.state.playlistActive  },
				  { key: 'song', icon: 'music', title: 'Song', description: this.state.song, active : this.state.songActive, disabled : this.state.songDisabled },
				  { key: 'learn', icon: 'new pied piper', title: 'Learn', description: 'Learn to play!', active : this.state.learnActive, disabled : this.state.learnDisabled },
				];
				const playlist = this.state.playlist;

				const display = this.state.playlistActive
												? ( <TabBar {...otherProps} currentTab={currentTab} 
																		onTabClick={this.onTabClick} 
																		onPlaylistClick={this.onPlaylistClick} 
																		tabs={tabs}  /> )

												: ( <h1>{playlist}{songs}</h1>);
        return (
								<div>
									<Step.Group items={steps} />
									{display}

								</div>
							);
    }
}

