import React from 'react';
import MkNote from '../mkNote/index';
import {
  BackwardFilled,
  FileAddOutlined,
  FileOutlined,
  SaveOutlined,
  FolderOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { getMenu, createDir } from '../api/client';
import { notify } from '../notification';
import AsyncPopup from '../asyncPopup';
import './style.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;
const Item = Menu.Item;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'mk',
      isSidebarCollapsed: true,
      renderedMenu: null,
      newFolderPopupVisible: false,
    }
  }

  componentDidMount() {
    const res = getMenu();
    res.then((data) => {
      console.info('menu', data);
      this.setState({renderedMenu: this.renderMenu(data, true)});
    }, (e) => {
      notify('error', 'failed to fetch your folders, please refresh');
    });
  }

  // construct React menu components from JSON data
  renderMenu(node, isRoot) {
    if (isRoot) {
      const children = node.children.map((child) => this.renderMenu(child, false));
      const content = (
        <SubMenu 
          key={node.id} 
          icon={<FolderOutlined />} 
          title={node.name}
          onTitleClick={this.moveSideMenu.bind(this, false)}
          popupClassName='side-bar-popup'
        >
          {children}
        </SubMenu>
      );
      return content;
    } else if (node.type === 'FILE') {
      return <Item key={node.id} icon={<FileOutlined />}>{node.name}</Item>;
    } else {
      const children = node.children.map((child) => this.renderMenu(child, false));
      return (
        <SubMenu
          key={node.id}
          icon={<FolderOutlined />} 
          title={node.name}
        >
          {children}
        </SubMenu>);
    }
  }

  moveSideMenu = collapsed => {
    this.setState({ isSidebarCollapsed: collapsed });
  };

  setNewFolderPopupVisible = visible => {
    this.setState({ newFolderPopupVisible: visible });
  }

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
              <Menu.Item key="new_notebook" icon={<FolderAddOutlined />} onClick={this.setNewFolderPopupVisible.bind(this, true)}>
                New Note Book
              </Menu.Item>
              <Menu.Item key="new_note" icon={<FileAddOutlined/>}>
                New Note
              </Menu.Item>
              <Menu.Item key="save" icon={<SaveOutlined/>}>
                Save
              </Menu.Item>
              {this.state.renderedMenu}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <MkNote isSidebarDeployed={!this.state.isSidebarCollapsed} />
          </Layout>
        </Layout>

        {/* popup */}
        <AsyncPopup 
          visible={this.state.newFolderPopupVisible} 
          title="Create a new notebook."
          placeholder="Give a name for your new notebook"
          onCancel={this.setNewFolderPopupVisible.bind(this, false)}
          apiFunction={createDir}
          key={Math.random()}
        />
      </div>
    );
  }
}

export default App;
