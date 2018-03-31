import React, { Component } from 'react';
import { Header,Container } from "semantic-ui-react";
import TabBarContainer from "./features/tabs/TabBarContainer";
import Artists from "./features/artists/Artists";
import Genres from "./features/genres/Genres";
import './App.css';

const Custom = () => <div>Custom Playlists</div>;

const steps1 = [ 
  { key: 'playlist', active: true, icon: 'spotify', title: 'Playlist', description: 'Choose a playlist' },
  { key: 'song', disabled: true, icon: 'music', title: 'Song', description: 'Select a song' },
  { key: 'learn', disabled: true, icon: 'new pied piper', title: 'Learn', description: 'Learn to play!' },
];

const steps2 = [ 
  { key: 'playlist', active: false, icon: 'spotify', title: 'Playlist', description: 'Choose a playlist' },
  { key: 'song', active: true, icon: 'music', title: 'Song', description: 'Select a song' },
  { key: 'learn', disabled: true, icon: 'new pied piper', title: 'Learn', description: 'Learn to play!' },
];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			steps: steps1,
		}
	}

	onPlaylistClick = (name) => {
      this.setState({
        steps: steps2,
      });
	}

	render() {
		const tabs = [
				{name : "artists", label : "Artists", component : Artists,},
				{name : "genres",  label : "Genres",  component : Genres,},
				{name : "custom",  label : "Custom",  component : Custom,}
		];
		const steps = this.state.steps;

		return (
			<div className="App">
				<div className="App-header">
					<Header inverted as="h1">tilted towers</Header>
				</div>
				<Container>
					<TabBarContainer tabs={tabs} size="massive" />
				</Container>
			</div>
		);
	}
}

export default App;
