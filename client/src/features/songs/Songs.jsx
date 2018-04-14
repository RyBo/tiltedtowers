import React, { Component } from "react";
import { List, Transition } from "semantic-ui-react";

class Songs extends Component {

    render() {
        const visible = this.props.visible;
        const tracks = this.props.songs.map((name,i) => {
            const song = JSON.parse(name);
            const artist = song.track.artists[0].name;
            return (
               <List.Item key={i} onClick={(e) => this.props.onClick(song.track.name, artist, e)}>
                    <List.Content>
                        <List.Header>{song.track.name}</List.Header>
                         {artist} 
                    </List.Content>
                </List.Item>
            );
        });

        return (
            <Transition visible={visible} animation="fade right" duration="200">
                <List divided selection relaxed='very' size='big'>
                    {tracks}
                </List>
            </Transition>
        );
    }
}

export default Songs;
