import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

const Songs = (props) => {

	const tracks = props.songs.map((name,i) => {
		const song = JSON.parse(name);
		const artist = song.track.artists[0].name;
		const album = song.track.album.name;
		return (
		<Button fluid key={i} name={song.name} onClick={(e) => props.onClick(song.track.name, e)}>
      	{song.track.name} - {artist}
   </Button>
		);
	});

	return (
		<div>
		{tracks}
		</div>
	);
}

export default Songs;
