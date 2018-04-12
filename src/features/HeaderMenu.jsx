import React, { Component } from 'react';
import { Menu, Icon, Input, Transition} from "semantic-ui-react";

class HeaderMenu extends Component {
    render() {
        const visible=this.props.visible;
        return (
            <Menu text>
            <Menu.Item className="header-title" name='titled towers'/>
            <Menu.Menu position='right'>
            <Menu.Item>
            <Transition animation="slide left" visible={visible}>
            <Input placeholder='Search Spotify...' />
            </Transition>
            <Icon name='search' onClick={this.props.onClick} />
            </Menu.Item>
            </Menu.Menu>
            </Menu>

        );
    }
}

export default HeaderMenu;
