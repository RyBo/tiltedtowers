import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

const Songs = (props) => {

	const tracks = props.songs.map((name,i) => {
		const song = JSON.parse(name);
		const artist = song.track.artists[0].name;
		return (
		<Button fluid basic animated key={i} name={song.name} onClick={(e) => props.onClick(song.track.name, e)}>
      <Button.Content visible>
      	{song.track.name} - {artist}
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
