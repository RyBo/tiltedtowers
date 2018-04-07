import React from "react";
import { Embed } from "semantic-ui-react";

const Learn = (props) => {
	console.log(props);

	const videos = props.videos.map((name,i) => {
		const video = JSON.parse(name);	
		const id = video.id.videoId;
		const placeholder = video.snippet.thumbnails.high.url;

		return (
			<Embed 
				key={id}
				id={id}
				source="youtube"
				placeholder={placeholder}
			/>	
		);
		
	});

	return (
			<div>
				{videos}	
			</div>
		);
}

export default Learn;
