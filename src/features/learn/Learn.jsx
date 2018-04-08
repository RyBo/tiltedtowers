import React from "react";
import { Embed, Segment } from "semantic-ui-react";

const Learn = (props) => {

	const videos = props.videos.map((name,i) => {
		const video = JSON.parse(name);	
		const id = video.id.videoId;
		const title = video.snippet.title;
		const placeholder = video.snippet.thumbnails.high.url;
		console.log(video);

		return (
			<Segment key={id}>
				<h3>{title}</h3>
				<Embed 
					id={id}
					source="youtube"
					placeholder={placeholder}
				/>	
			</Segment>
		);
		
	});

	return (
			<div>
				{videos}	
			</div>
		);
}

export default Learn;
