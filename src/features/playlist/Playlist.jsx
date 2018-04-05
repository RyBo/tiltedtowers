import React from "react";
import { Button, Icon, Image, Segment } from "semantic-ui-react";

const Playlist = (props) => {

	const finaldata = props.playlist.map((name,i) => {
		const artist = JSON.parse(name);
		console.log(artist);
		return (
		<Button animated='fade' name={artist.name} onClick={(e) => props.onClick(artist.name,e)}>
      <Button.Content visible>
				<Image src={artist.images[0].url} size='small' rounded />
      </Button.Content>
      <Button.Content hidden>
    		<h2>{artist.name}</h2>
      </Button.Content>
    </Button>
		);
	});


	return (
		<div>
		{finaldata}
		</div>
	);
}

export default Playlist;
