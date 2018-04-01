import React, { Component } from 'react';
import { Header,Container } from "semantic-ui-react";
import MenuContainer from "./features/MenuContainer";

import Playlist from "./features/playlist/Playlist";
import Songs from "./features/songs/Songs";

import './App.css';

const Custom = () => <div>Custom Playlists</div>;
const artistPlaylist = ['Nirvana','Metallica','Foo Fighters','AC/DC'];
const genrePlaylist  = ['Rock','Metal','Alternative','Acoustic'];

class App extends Component {

	render() {
		const songs = (<Songs />);
		const tabs = [
				{name : "artists", label : "Artists", component : Playlist, items : artistPlaylist, },
				{name : "genres",  label : "Genres",  component : Playlist, items : genrePlaylist, },
				{name : "custom",  label : "Custom",  component : Custom, items: artistPlaylist, },
		];

		return (
			<div className="App">
				<div className="App-header">
					<Header inverted as="h1">tilted towers</Header>
				</div>
				<Container>
					<MenuContainer tabs={tabs} songs={songs} size="massive" />
				</Container>
			</div>
		);
	}
}

export default App;
