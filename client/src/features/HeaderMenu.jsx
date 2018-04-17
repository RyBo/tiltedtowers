import React, { Component } from 'react';
import { Menu, Radio, Icon, Input, Transition} from "semantic-ui-react";

class TTSubMenu extends Component {

  state = { activeItem : 'guitar' }

  handleItemClick = (e, { value }) => {
      this.setState({ activeItem : value }, () => {
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
            <Menu.Item name='guitar'>
            <Radio
                toggle
                label='Guitar'
                name='radioGroup'
                value='guitar'
                checked={activeItem === 'guitar'}
                onChange={this.handleItemClick}
            />
            </Menu.Item>

            <Menu.Item name='bass'>
            <Radio
                toggle
                label='Bass'
                name='radioGroup'
                value='bass'
                checked={activeItem === 'bass'}
                onChange={this.handleItemClick}
            />
            </Menu.Item>

            <Menu.Item name='piano'>
            <Radio
                toggle
                label='Piano'
                name='radioGroup'
                value='piano'
                checked={activeItem === 'piano'}
                onChange={this.handleItemClick}
            />
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
    state = { visible : false }

    toggleSearch = () => this.setState({ visible : !this.state.visible });
    render() {
        const { visible } =this.state
        return (
        
            <div>

                <Menu text>
                    <Menu.Item className="header-title" name='tilted towers'/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name='ellipsis horizontal' onClick={this.toggleSearch} />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Transition animation="fade left" visible={visible} duration="450">
                    <div>
                        <TTSubMenu onClick={this.props.onClick} />
                    </div>
                </Transition>

            </div>
        );
    }
}

export default HeaderMenu;
