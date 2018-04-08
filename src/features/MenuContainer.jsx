import React, { Component } from "react";
import { Step, Segment } from 'semantic-ui-react';

import YoutubeAPIKey from '../auth/YoutubeAPIKey';
import axios from 'axios';

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

            playlist : 'Choose a Playlist',
          	playlistHref : '',
          	artist : '',
            song : 'Select a Song',
          	videos : [],
        };
    }

  	handlePlaylistClick = (name,href) => {
  		this.setState({
				playlist : name,
				playlistHref : href,
				activeStep : 'song',
				songDisabled : false,

  		});
  		this.props.loadSongs(href);
  	}

  	handleSongClick = (song,artist) => {
  		this.setState({
				song : song,
				aritist: artist,
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
    	const search_params = "search?q="+song+" by "+artist+" guitar lesson+tutorial+how to play" +"&key="+YoutubeAPIKey+"&part=snippet&maxResults=3";

    	axios.get('/youtube/' + search_params)
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
				  { key: 'learn', name: 'learn', icon: 'pied piper alternate', title: 'Learn', description: 'Learn to play!', active : activeStep === 'learn', disabled : this.state.learnDisabled, onClick: this.handleStepClick},
				];

				const display = activeStep === 'playlist' ? (<Playlists playlists={playlists} onClick={this.handlePlaylistClick}/>)
												: activeStep === 'song' ? ( <Songs songs={songs} onClick={this.handleSongClick} />)
														: ( <Learn videos={videos} onClick={this.handleSongClick} />);
        return (
								<div>
									<Step.Group widths={3} items={steps} />
									<Segment raised color="purple">
									{display}
									</Segment>
								</div>
							);
    }
}
