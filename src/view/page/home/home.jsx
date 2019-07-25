import React from 'react';
import { Route } from 'react-router-dom'
import { Tabs, Avatar, Icon, Layout } from 'antd';
import './home.css'
import store from '../../store'
import { menuObject, menus } from '../../routes/router'
import  MenuList  from './menu'
import  CaleTool  from './caleTool'

const { Content, Header } = Layout;
const TabPane = Tabs.TabPane;
const menuArr = [];//链式菜单对象，用于动态生成tabs的时候使用

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'homeMain',
            panes: []
        }
    }

    add = (event) => {
        let exitPane = this.getExitPane('id', event.key);
		if(exitPane != null) {
			this.setState({activeKey: event.key});
			return;
		}
        //创建新的tab项
        let matchMenus = menuArr.filter((item) => item.id === event.key);
		if(matchMenus.length > 0) {
			this.setState((prevState) => {
				prevState.panes.push(matchMenus[0]);
				return {
					panes: prevState.panes,
					activeKey: event.key
				}
			})
        }
    }
    onChange = (activeKey) => {
		let exitPane = this.getExitPane('id', activeKey);
		if(exitPane !== null) {
			this.props.history.push(exitPane.url);
			this.setState({ activeKey });
		}
    }
    onEdit = (targetKey, action) => {
		this[action](targetKey);
	}
    remove = (targetKey) => {
		const panes = this.state.panes.filter(pane => pane.id !== targetKey);
        let length = panes.length;
		if (length > 0) {
            let activeKey = panes[length - 1].id;
			this.setState({ panes, activeKey });
			this.props.history.push(panes[length - 1].url);
		}
	}
    goHome = () => {
        if (this.state.activeKey === 'homeMain') return;
        this.setState({
            activeKey: 'homeMain'
        })
    }
    logout = () => {
        store.dispatch({
            type: 'SET_LOGGED_USER',
            logged: false
        });
        this.props.history.push('/login');
        sessionStorage.setItem('userName', null);
    }
    getExitPane = (propertyName, value) => {
		let matchPanes = this.state.panes.filter((item) => item[propertyName] === value);
		if(matchPanes.length > 0) {
			return matchPanes[0];
		}
		return null;
	}
    
    render() {
        let cont = null;
        if (this.state.activeKey === 'homeMain') {
            cont = <div>
                    <h2>日历提醒</h2>
                    <CaleTool />
                </div>
        } else {
            cont = <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
					>
                    {this.state.panes.map(
                        pane => {
                            let route = null;
                            if(menuObject.hasOwnProperty(pane.component)) {
                                route = <Route path={pane.url} exact component={menuObject[pane.component]} />;
                            }
                            return <TabPane tab={pane.title} key={pane.id}>{route} </TabPane>
                        }
                    )}
                </Tabs>
        }  
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header>
                    <h2 className="sys-name">Polc</h2>
                    <span className="fl-rt user-info">
                        <Avatar icon="user" />&nbsp;&nbsp;welcome&nbsp;{sessionStorage.getItem('userName')}
                        <Icon type="home" onClick={this.goHome.bind(this)} />
                        <Icon type="logout" onClick={this.logout.bind(this)} />
                    </span>
                </Header>
                <Layout>
                    <MenuList addTabs={this.add} activeKey={this.state.activeKey} />
                    <Layout>
                        <Content>
                            { cont }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

    componentDidMount() {
        menus.map((item) => {
            menuArr.push({...item})
        })
    }
}

export default Home