import React from "react";
import { Button, Icon,  Segment } from "semantic-ui-react";

const artistsInfo = ['Nirvana', 'Metallica', 'Smashing Pumpkins', 'AC/DC', 'Pink Floyd']; 

const Artists = (props) => {

	const artistPlaylists = artistsInfo.map(name => {
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
			{artistPlaylists}
		</div>
	);
}

export default Artists;
