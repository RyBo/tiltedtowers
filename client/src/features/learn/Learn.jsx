import React, { Component } from "react";
import { Transition, Embed, Segment } from "semantic-ui-react";

class Learn extends Component {

    render() {
        const visible = this.props.visible;
        const videos = this.props.videos.map((name,i) => {
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
            <Transition visible={visible} animation="fade left" duration="200">
                <div>
                    {videos}    
                </div>
            </Transition>
        );
    }
}

export default Learn;
