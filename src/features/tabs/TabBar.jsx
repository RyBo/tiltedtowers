import React from "react";
import { Segment } from "semantic-ui-react";
import ToggleDisplay from "react-toggle-display";

import Tab from "./Tab";

const TabBar = (props) => {
	const {tabs, currentTab, onTabClick, onPlaylistClick, ...otherProps} = props;

	const tabItems = tabs.map(tabInfo => {
		const {name, label} = tabInfo;

		return (
            <Tab
                key={name}
                name={name}
                label={label}
                active={currentTab === name}
                onClick={onTabClick}
            />
		);
	});

  const tabPanels = tabs.map(tabInfo => {
  	const {name, component: TabComponent, items} = tabInfo;

  	return (
  		<ToggleDisplay show={name === currentTab} key={name}>
  			<TabComponent  onClick={onPlaylistClick} playlist={items}/>
  		</ToggleDisplay>
  	)
  });

    return (
        <div>
      		<Segment raised color="purple">
      					{tabPanels}
      		</Segment>
        </div>
    );
}

export default TabBar;

