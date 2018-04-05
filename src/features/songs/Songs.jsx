import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

const Songs = (props) => {

	const tracks = props.songs.map((name,i) => {
		const song = JSON.parse(name);
		console.log(song);
		return (
		<Button fluid basic rounded animated key={song.id} name={song.name} onClick={(e) => props.onClick(song.track.name, e)}>
      <Button.Content visible>
      	{song.track.name}
      </Button.Content>
      <Button.Content hidden>
    		<Icon name='right arrow' />
      </Button.Content>
    </Button>
		);
	});

	return (
		<div>
		<Segment raised color="violet">
		{tracks}
		</Segment>
		</div>
	);
}

export default Songs;
