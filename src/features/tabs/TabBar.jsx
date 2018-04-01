import React from "react";
import { Grid, Menu } from "semantic-ui-react";
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
  	const {name, component: TabComponent} = tabInfo;

  	return (
  		<ToggleDisplay show={name === currentTab} key={name}>
  			<TabComponent  onClick={onPlaylistClick} />
  		</ToggleDisplay>
  	)
  });

    return (
        <div>
      		<Grid columns={2} divided>
      			<Grid.Column width={3}>
            <Menu fluid vertical tabular {...otherProps}>
                {tabItems}
            </Menu>
      			</Grid.Column>
      			<Grid.Column width={10}>
      					{tabPanels}
      			</Grid.Column>
      		</Grid>
        </div>
    );
}

export default TabBar;

