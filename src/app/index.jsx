import React from 'react';
import MkNote from '../mkNote/index';
import {
  BackwardFilled,
  FileAddOutlined,
  SaveOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './style.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'mk',
      isSidebarCollapsed: true,
    }
  }

  moveSideMenu = collapsed => {
    console.log(collapsed)
    this.setState({ isSidebarCollapsed: collapsed });
  };

  render() {
    // const sideBarStyle = this.state.isSidebarDeployed? 'side-bar deployed' : 'side-bar shrinked';
    return (
      <div className="App">
        <Layout>
          <Sider 
            className="side-bar" 
            collapsible 
            collapsed={this.state.isSidebarCollapsed} 
            onCollapse={this.moveSideMenu}
            // collapsedWidth={60}
            width={240}
            trigger={<BackwardFilled className='forward-arrow icon-btn' style={{ fontSize: '3rem' }}/>}
            reverseArrow={true}
          >
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="new" icon={<FileAddOutlined/>}>
                New Note
              </Menu.Item>
              <Menu.Item key="save" icon={<SaveOutlined/>}>
                Save
              </Menu.Item>
              <SubMenu 
                key="directory" 
                icon={<FolderOutlined />} 
                title="root"
                onTitleClick={this.moveSideMenu.bind(this, false)}
                popupClassName='side-bar-popup'
              >
                <Menu.Item key="d1" icon={<FolderOutlined />}>Company</Menu.Item>
                <Menu.Item key="d2" icon={<FolderOutlined />}>Java</Menu.Item>
                <Menu.Item key="d3" icon={<FolderOutlined />}>Family</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <MkNote isSidebarDeployed={!this.state.isSidebarCollapsed} />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
