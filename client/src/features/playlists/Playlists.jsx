import React, { Component } from "react";
import { Transition, Button, Image } from "semantic-ui-react";

class Playlists extends Component {

    render() {
        const visible = this.props.visible;
        const lists = this.props.playlists.map((name,i) => {
            const playlist = JSON.parse(name);
            const href = playlist.tracks.href.substring(26);
            return (
                <Button basic animated='fade' key={playlist.id} name={playlist.name} onClick={(e) => this.props.onClick(playlist.name, href, e)}>
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
            <Transition visible={visible} animation="fade right" duration="200">
                <div>
                    {lists}
                </div>
            </Transition>
        );
    }
}

export default Playlists;
