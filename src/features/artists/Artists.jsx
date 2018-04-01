import React from "react";
import { Button, Icon,  Segment } from "semantic-ui-react";

const artistsInfo = ['Nirvana', 'Metallica', 'Smashing Pumpkins', 'AC/DC', 'Pink Floyd']; 

const Artists = (props) => {

	const artistPlaylists = artistsInfo.map(name => {
		return (
		<Segment>
		<Button fluid animated='fade' onClick={props.onClick}>
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
			{artistPlaylists}
		</div>
	);
}

export default Artists;
