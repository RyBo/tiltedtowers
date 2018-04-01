import React, { Component } from 'react';
import { Header,Container } from "semantic-ui-react";
import TabBarContainer from "./features/tabs/TabBarContainer";
import Artists from "./features/artists/Artists";
import Genres from "./features/genres/Genres";
import './App.css';

const Custom = () => <div>Custom Playlists</div>;

class App extends Component {

	render() {
		const tabs = [
				{name : "artists", label : "Artists", component : Artists,},
				{name : "genres",  label : "Genres",  component : Genres,},
				{name : "custom",  label : "Custom",  component : Custom,}
		];

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
