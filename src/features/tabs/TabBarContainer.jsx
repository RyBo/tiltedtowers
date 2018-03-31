import React, { Component } from "react";
import StepContainer from "../steps/StepContainer";
import TabBar from "./TabBar";

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

export default class TabBarContainer extends Component {
    constructor(props) {
        super(props);

        const {tabs = [{name : null}]} = props;

        const firstTab = tabs[0];

        this.state = {
            currentTab : firstTab.name,
        		steps : steps1,
        } ;
    }

    onTabClick = (name) => {
        this.setState({
        	currentTab : name,
        });
    }

  	onPlaylistClick = (name) => {
  		this.setState({
  			steps : steps2,
  		});
  	}

    render() {
        const {tabs, ...otherProps} = this.props;
        const currentTab = this.state.currentTab;
      	const steps = this.state.steps;
        
        return (

					<div>
						<StepContainer items={steps} />
            <TabBar
                {...otherProps}
                currentTab={currentTab}
                onTabClick={this.onTabClick}
          			onPlaylistClick={this.onPlaylistClick}
                tabs={tabs} 
            />
          </div>
        );
    }
}

