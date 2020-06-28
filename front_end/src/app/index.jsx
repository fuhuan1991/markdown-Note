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
import InputPopup from '../inputPopup';
import DirModule from '../dirModule';
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
      dirTable: null,
      renderedMenu: null,
      newFolderPopupVisible: false,
      openNotebooks: [],
      rootKey: null,
      currentSelectedType: 'INIT',
      selectedDirId: null,
      selectedNoteId: null,
    }
  }

  componentDidMount() {
    this.fetchMenuFromRear();
  }

  fetchMenuFromRear = () => {
    const res = getMenu();
    res.then((rootNode) => {
      console.info('fetch Menu From Rear', rootNode);
      const dirTable = this.generateDirTable(rootNode)
      this.setState({
        dirTable: dirTable,
        renderedMenu: this.renderMenu(rootNode, true),
        rootKey: rootNode.id,
        // openNotebooks: [rootNode.id],
      });
    }, (e) => {
      notify('error', 'failed to fetch your notebooks, please refresh');
    });
  }

  generateDirTable = (rootNode) => {
    // console.log(rootNode)
    const dirs = rootNode.children;
    const dirTable = {};
    dirTable[rootNode.id] = {
      id: rootNode.id,
      name: rootNode.name,
      files: rootNode.children,
      type: rootNode.type,
    };
    for (let dir of dirs) {
      dirTable[dir.id] = {
        id: dir.id,
        name: dir.name,
        files: dir.children,
        fype: dir.type,
      }
    }
    return dirTable;
  }

  // construct React menu components from JSON data
  renderMenu(node, isRoot) {
    if (isRoot) {
      const children = node.children.map((child) => this.renderMenu(child, false));
      const content = (
        <SubMenu 
          key={node.id} 
          icon={<FolderOutlined />} 
          title='Notebooks'
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
      // then the node type must be 'DIR'
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

  setNewFolderPopupVisibility = visible => {
    this.setState({ newFolderPopupVisible: visible });
  }

  onItemSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log("onItemSelect", item, key)
    if (key === 'new_notebook') {
      // noting need to be done, keep the state unchanged
    } else {
      console.log('note selected', item, key);
      this.setState({
        currentSelectedType: 'FILE',
      });
    }
  }

  onSubmenuOpen = (openKeys) => {
    if (this.state.isSidebarCollapsed) return;
    console.log('submenu selected', openKeys)

    if (openKeys.length === 0) {
      // Root has been deselected, hide all sub menus
      this.setState({
        openNotebooks: [],
        selectedDirId: this.state.rootKey,
        selectedNoteId: [],
        currentSelectedType: 'DIR',
      });
    } else if (openKeys.length === 1) {
      if (openKeys[0] !== this.state.rootKey) {
        // Root has been deselected, hide all sub menus
        this.setState({
          openNotebooks: [],
          selectedDirId: this.state.rootKey,
          selectedNoteId: [],
          currentSelectedType: 'DIR',
        });
      } else {
        // Root has been selected, hide all sub menus
        this.setState({
          openNotebooks: [this.state.rootKey],
          selectedDirId: this.state.rootKey,
          selectedNoteId: [],
          currentSelectedType: 'DIR',
        });
      }
    } else {
      // A directory has been selected
      this.setState({
        openNotebooks: [openKeys[0], openKeys[openKeys.length-1]],
        selectedDirId: openKeys[openKeys.length-1],
        selectedNoteId: [],
        currentSelectedType: 'DIR',
      });
    } 
  }

  onDirInspect = (id) => {
    this.setState({
      openNotebooks: [this.state.rootKey, id],
      selectedDirId: id,
      currentSelectedType: 'DIR',
    });
  }

  render() {

    const { currentSelectedType } = this.state;

    return (
      <div className="App">
        <Layout>

          {/* Menu */}
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
            <Menu
             mode="inline" selectable={true}
             onSelect={this.onItemSelect}
             onOpenChange={this.onSubmenuOpen}
             openKeys={this.state.openNotebooks}
             selectedKeys={[this.state.selectedNoteId]}
            >
              <Menu.Item key="new_notebook" icon={<FolderAddOutlined />} onClick={this.setNewFolderPopupVisibility.bind(this, true)}>
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

          {/* Modules */}
          <Layout className="site-layout module-frame">
            {currentSelectedType === 'DIR' && 
              <DirModule 
                directory={this.state.dirTable[this.state.selectedDirId]} 
                updateFunction={this.fetchMenuFromRear}
                onDirInspect={this.onDirInspect}
              />}
            {currentSelectedType === 'FILE' && <MkNote isSidebarDeployed={!this.state.isSidebarCollapsed} />}
            {currentSelectedType === 'INIT' && "Welcome!"}
          </Layout>

        </Layout>

        {/* popup */}
        <InputPopup 
          visible={this.state.newFolderPopupVisible} 
          title="Create a new notebook."
          placeholder="Give a name for your new notebook"
          onCancel={this.setNewFolderPopupVisibility.bind(this, false)}
          apiFunction={createDir}
          key={Math.random()}
          afterSuccess={this.fetchMenuFromRear}
        />
      </div>
    );
  }
}

export default App;
