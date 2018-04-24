import React, { Component } from "react";
import { Transition, Button, Image } from "semantic-ui-react";

class Search extends Component {

    render() {
        const visible = this.props.visible;
        
        const playlists = this.props.playlists.map((name,i) => {
            const item = JSON.parse(name);
            const href = playlist.tracks.href.substring(26);
            return (
            
            );
       });
        const albums = this.props.albums.map((name,i) => {
            const item = JSON.parse(name);
            const href = playlist.tracks.href.substring(26);
            return (
            
            );
       });
        const artists = this.props.artists.map((name,i) => {
            const item = JSON.parse(name);
            const href = playlist.tracks.href.substring(26);
            return (
            
            );
       });
        const songs = this.props.songs.map((name,i) => {
            const item = JSON.parse(name);
            const href = playlist.tracks.href.substring(26);
            return (
            
            );
       });

        return (
            <Transition visible={visible} animation="fade right" duration="200">
                <div>
                    { tracks }
                    <Divider horizontal>Or</Divider>
                    { tracks }
                    <Divider horizontal>Or</Divider>
                    { tracks }
                    <Divider horizontal>Or</Divider>
                    { tracks }
                </div>
            </Transition>
        );
    }
}

export default Search;
