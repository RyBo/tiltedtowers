import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Input, Transition} from "semantic-ui-react";

class TTSubMenu extends Component {

  state = { activeItem : 'guitar' }
  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name }, () => {
        this.props.onClick(this.state.activeItem, e)
      })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item>
          <Input placeholder='Search Spotify...' />
        </Menu.Item>

        <Menu.Item>
          <Menu.Menu>
            <Menu.Item name='guitar' active={activeItem === 'guitar'} onClick={this.handleItemClick}>
              Guitar
            </Menu.Item>
            <Menu.Item name='bass' active={activeItem === 'bass'} onClick={this.handleItemClick}>
              Bass 
            </Menu.Item>
            <Menu.Item name='piano' active={activeItem === 'piano'} onClick={this.handleItemClick}>
              Piano 
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item name='github'>
          <Icon name='github' />
          Github 
        </Menu.Item>
    </Menu>
    )
  }
}

class HeaderMenu extends Component {
    render() {
        const visible=this.props.visible;
        return (
        
            <div>

                <Menu text>
                    <Menu.Item className="header-title" name='tilted towers'/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name='ellipsis horizontal' onClick={this.props.onClick} />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Transition animation="slide left" visible={visible} duration="105">
                    <div>
                        <TTSubMenu onClick={this.props.onClick} />
                    </div>
                </Transition>

            </div>
        );
    }
}

export default HeaderMenu;
