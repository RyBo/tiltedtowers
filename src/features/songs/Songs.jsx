import React from "react";
import { Button, Icon,  Segment } from "semantic-ui-react";

const songsPlaylist = ['Smells like Teen Spirit', 'In Bloom', 'Come As You Are', 'Heart-Shaped Box', 'Lithium']; 

const Songs = (props) => {

	const songsList = songsPlaylist.map(name => {
		return (
		<Segment key={name} name={name}>
		<Button fluid animated='fade' name={name} onClick={(e) => props.onClick(name,e)}>
      <Button.Content visible>{name}</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
		);
	});

	return (
		<div>
			{songsList}
		</div>
	);
}

export default Songs;
