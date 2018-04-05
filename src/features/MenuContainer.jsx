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

            playlist : 'Choose a Playlist',
          	playlistHref : '',
            song : 'Select a Song',

        };
    }

  	onPlaylistClick = (name,href) => {
  		this.setState({
				playlist : name,
				playlistHref : href,

				playlistActive : false,
				songActive : true,
				songDisabled : false,

  		});
  		this.props.loadSongs(href);
  	}

  	onSongClick = (name) => {
  		this.setState({
				song : name,
  			songActive : false,
  			learnActive : true,
  			learnDisabled : false,
  		});
  	}

  	onPlayStepClick = (name) => {
  		this.setState({
  			playlistActive : true,
  			songActive : false,
  			learnActive : false,
  		});
  	}

  	onSongStepClick = (name) => {
  		this.setState({
				playlistActive : false,
  			songActive : true,
  			learnActive : false,
  		});
  	}

  	onLearnStepClick = (name) => {
  		this.setState({
				playlistActive : false,
  			songActive : false,
  			learnActive : true,
  		});
  	}

    render() {
        const {playlists, songs} = this.props;
				const steps = [ 
				  { key: 'playlist', icon: 'spotify', title: 'Playlist', description: this.state.playlist, active : this.state.playlistActive, onClick : this.onPlayStepClick },
				  { key: 'song', icon: 'music', title: 'Song', description: this.state.song, active : this.state.songActive, disabled : this.state.songDisabled, onClick: this.onSongStepClick },
				  { key: 'learn', icon: 'new pied piper', title: 'Learn', description: 'Learn to play!', active : this.state.learnActive, disabled : this.state.learnDisabled, onClick: this.onLearnStepClick},
				];

				const display = this.state.playlistActive ? (<Playlists playlists={playlists} onClick={this.onPlaylistClick}/>)
												: this.state.songActive ? ( <Songs songs={songs} onClick={this.onSongClick} />)
														: ( <Learn onClick={this.onSongClick} />);
        return (
								<div>
									<Step.Group items={steps} />
									{display}
								</div>
							);
    }
}
