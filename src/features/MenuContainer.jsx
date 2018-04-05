import React, { Component } from "react";
import { Step } from 'semantic-ui-react';

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
            song : 'Select a Song',

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

  	handleSongClick = (name) => {
  		this.setState({
				song : name,
				activeStep : 'learn',
  			learnDisabled : false,
  		});
  	}

  	handleStepClick = (e, {name}) => {
  		this.setState({
  			activeStep : name
  		});
  	}

    render() {
    	  const activeStep = this.state.activeStep;
        const {playlists, songs} = this.props;
				const steps = [ 
				  { key: 'playlist', name: 'playlist', icon: 'spotify', title: 'Playlist', description: this.state.playlist, active : activeStep === 'playlist',  onClick : this.handleStepClick},
				  { key: 'song', name: 'song', icon: 'music', title: 'Song', description: this.state.song, active : activeStep === 'song', disabled : this.state.songDisabled, onClick: this.handleStepClick},
				  { key: 'learn', name: 'learn', icon: 'new pied piper', title: 'Learn', description: 'Learn to play!', active : activeStep === 'learn', disabled : this.state.learnDisabled, onClick: this.handleStepClick},
				];

				const display = activeStep === 'playlist' ? (<Playlists playlists={playlists} onClick={this.handlePlaylistClick}/>)
												: activeStep === 'song' ? ( <Songs songs={songs} onClick={this.handleSongClick} />)
														: ( <Learn onClick={this.handleSongClick} />);
        return (
								<div>
									<Step.Group items={steps} />
									{display}
								</div>
							);
    }
}
