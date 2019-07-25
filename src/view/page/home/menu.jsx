import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd';
import { menus } from '../../routes/router'

const { Sider } = Layout;

class MenuList extends React.Component {
    state = {
        collapsed: false
    }
    
    onCollapse = collapsed => {
        this.setState({ collapsed });
    }

	createMenu(data) {
        return (
            <Menu.Item key={data.id} onClick={this.props.addTabs}>
                <NavLink to={data.url}>
                    <Icon type={data.icon} /><span>{data.title}</span>
                </NavLink>
            </Menu.Item>
        )
    }
    
	render() {
        // console.log(this.props.activeKey)
		return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                 <Menu mode="vertical" theme="dark" selectedKeys={[this.props.activeKey]}>
                    {
                        menus.map((item) => {
                            return this.createMenu(item);
                        })
                    }
                </Menu>
            </Sider>
		);
    }
}

export default MenuList