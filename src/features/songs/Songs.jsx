import React, { Component } from "react";
import { Transition, Button } from "semantic-ui-react";

class Songs extends Component {

    render() {
        const visible = this.props.visible;
        const tracks = this.props.songs.map((name,i) => {
            const song = JSON.parse(name);
            const artist = song.track.artists[0].name;
            return (
                <Button fluid key={i} name={song.name} onClick={(e) => this.props.onClick(song.track.name, artist, e)}>
            {song.track.name} - {artist}
            </Button>
            );
        });

        return (
            <Transition visible={visible} animation="fade right" duration="200">
                <div>
                    {tracks}
                </div>
            </Transition>
        );
    }
}

export default Songs;
