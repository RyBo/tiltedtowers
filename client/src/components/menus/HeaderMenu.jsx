import React, { Component } from 'react';
import { Menu, Icon, Transition} from 'semantic-ui-react';
import SideMenu from './SideMenu'; 

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
                        <SideMenu onClick={this.props.onClick} />
                    </div>
                </Transition>

            </div>
        );
    }
}

export default HeaderMenu;
