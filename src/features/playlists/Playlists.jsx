import React from "react";
import { Button, Image } from "semantic-ui-react";

const Playlists = (props) => {

	const lists = props.playlists.map((name,i) => {
		const playlist = JSON.parse(name);
		const href = playlist.tracks.href.substring(26);
		return (
		<Button basic color="violet" animated='fade' key={playlist.id} name={playlist.name} onClick={(e) => props.onClick(playlist.name, href, e)}>
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
		{lists}
		</div>
	);
}

export default Playlists;
