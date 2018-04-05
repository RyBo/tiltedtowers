import React from "react";
import { Button, Icon, Image, Segment } from "semantic-ui-react";

const Playlist = (props) => {

	const finaldata = props.playlist.map((name,i) => {
		const playlist = JSON.parse(name);
		return (
		<Button basic rounded color="violet" animated='fade' key={playlist.id} name={playlist.name} onClick={(e) => props.onClick(playlist.name,e)}>
      <Button.Content visible>
				<Image src={playlist.images[0].url} size='small' circular />
      </Button.Content>
      <Button.Content hidden>
    		<h2>{playlist.name}</h2>
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
