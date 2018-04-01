import React from "react";
import { Button, Icon,  Segment } from "semantic-ui-react";

const genreInfo = ['Rock', 'Metal', 'Alternative', 'Acoustic']; 

const Genre = (props) => {

	const genrePlaylists = genreInfo.map(name => {
		return (
		<Segment key={name}>
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
			{genrePlaylists}
		</div>
	);
}

export default Genre;
