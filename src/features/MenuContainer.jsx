import React, { Component } from "react";
import { Step } from 'semantic-ui-react';

import Playlists from './playlists/Playlists';
import Songs from './songs/Songs';

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

    render() {
        const {playlists, songs} = this.props;
				const steps = [ 
				  { key: 'playlist', icon: 'spotify', title: 'Playlist', description: this.state.playlist, active : this.state.playlistActive  },
				  { key: 'song', icon: 'music', title: 'Song', description: this.state.song, active : this.state.songActive, disabled : this.state.songDisabled },
				  { key: 'learn', icon: 'new pied piper', title: 'Learn', description: 'Learn to play!', active : this.state.learnActive, disabled : this.state.learnDisabled },
				];

				const display = this.state.playlistActive
												? (<Playlists playlists={playlists} onClick={this.onPlaylistClick}/>)
												: ( <Songs songs={songs} onClick={this.onSongClick} />);
        return (
								<div>
									<Step.Group items={steps} />
									{display}
								</div>
							);
    }
}

