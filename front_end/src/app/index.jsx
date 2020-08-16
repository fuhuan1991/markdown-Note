import React from 'react';
import {
  BackwardFilled,
  FileAddOutlined,
  FileMarkdownOutlined,
  SaveOutlined,
  FolderOutlined,
  FolderAddOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { getMenu, createDir, updateNote, createNote } from '../api/client';
import { notify } from '../notification';
import InputPopup from '../inputPopup';
import Routes from './Routes';
import { withRouter } from "react-router";
import initialText from '../initialNote';

import './style.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;
const Item = Menu.Item;

class App extends React.Component {

  rootKey = null;

  constructor(props) {
    super(props);
    this.state = {
      // mode: 'mk',
      isSidebarCollapsed: true,
      nodeTable: null,
      dirTable: null, // a hash table, with dir id as key and other dir info as the value
      renderedMenu: null, // a list of React components
      newFolderPopupVisible: false,
      newNotePopupVisible: false,
      openNotebooks: [],
      ready: false,
    }
  }

  componentDidMount() {
    this.fetchMenuFromRear();
  }

  fetchMenuFromRear = () => {
    const res = getMenu();
    res.then((o) => {
      if (!o || typeof o !== 'object') {
        notify('error', 'failed to fetch your notebooks, please refresh');
        return;
      }
      const { nodeTable, rootNode } = o;
      console.info('fetch Menu From Rear', nodeTable, rootNode);
      const dirTable = this.generateDirTable(rootNode);
      this.rootKey = rootNode.id;
      this.setState({
        ready: true,
        nodeTable: nodeTable,
        dirTable: dirTable,
        renderedMenu: this.renderMenu(rootNode, true),
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
  renderMenu = (node, isRoot) => {

    const { history } = this.props;

    if (isRoot) {
      const children = node.children.map((child) => this.renderMenu(child, false));
      const content = (
        <SubMenu 
          key={node.id} 
          icon={<FolderOutlined />} 
          title='Notebooks'
          onTitleClick={() => {
            const { isSidebarCollapsed } = this.state;
            if (isSidebarCollapsed) {
              this.moveSideMenu(false);
            } else {
              history.push(`/root`)
            }
          }}
          popupClassName='side-bar-popup'
        >
          {children}
        </SubMenu>
      );
      return content;
    } else if (node.type === 'MKD') {
      return <Item key={node.id} icon={<FileMarkdownOutlined />}>{node.name}</Item>;
    } else {
      // then the node type must be 'DIR'
      const children = node.children.map((child) => this.renderMenu(child, false));
      return (
        <SubMenu
          key={node.id}
          icon={<FolderOutlined />} 
          title={node.name}
          onTitleClick={() => { history.push(`/dir/${node.id}`) }}
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

  setNewNotePopupVisibility = visible => {
    this.setState({ newNotePopupVisible: visible });
  }

  // Event handler when a note file is selected in the menu
  onItemSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    const { history } = this.props;

    if (key === 'new_notebook' || key === 'new_note' || key === 'save') {
      // noting need to be done, keep the state unchanged
    } else if (key === 'home') {
      history.push(`/`);
    } else {
      // this.saveCurrent(true);
      history.push(`/note/${key}`);
    }
  }
  
  saveCurrent = () => {

    const { location } = this.props;
    const doc = window.codeMirror.getDoc();
    const isNotePage = location.pathname.indexOf('/note/') === 0;
    const noteId = location.pathname.slice(6);

    if (!isNotePage || !doc || !noteId || noteId.length < 1) return;

    const text = doc.getValue();
    updateNote(noteId, text).then(
      (res) => {
        notify('success', res);
      },
      () => {
        notify('error', 'update failed, try again later');
      }
    );
  }

  getOpenKeys = (pathname) => {
  
    const { nodeTable } = this.state;
    
    if (pathname.indexOf('/root') === 0) {
      return [this.rootKey];
    } else if (pathname.indexOf('/dir/') === 0) {
      // in a directory page
      const dirId = pathname.slice(5);
      return [this.rootKey, dirId];
    } else if (pathname.indexOf('/note/') === 0) {
      // in a note page
      const noteId = pathname.slice(6);
      const parentId = !!nodeTable[noteId] && nodeTable[noteId].parent_id;
      return [this.rootKey, parentId];
    } else {
      // in other page
      return [];
    }
  }

  getDirId = (pathname) => {
    if (pathname === '/root') {
      return this.rootKey;
    } else if (pathname.indexOf('/dir/') === 0){
      return pathname.slice(5);
    } else {
      return null;
    }
  }

  render() {

    const { isSidebarCollapsed, renderedMenu, dirTable, ready } = this.state;
    const { location } = this.props;
    const isNotePage = location.pathname.indexOf('/note/') === 0;
    const isDirPage = location.pathname.indexOf('/dir/') === 0 || location.pathname.indexOf('/root') === 0;
    const noteId = !!isNotePage ? location.pathname.slice(6) : null;
    const dirId = this.getDirId(location.pathname);
    const openKeys = ready ? this.getOpenKeys(location.pathname) : [];

    return (
      <div className="App">
        <Layout>

          {/* Menu */}
          <Sider 
            className="side-bar" 
            collapsible 
            collapsed={isSidebarCollapsed} 
            onCollapse={this.moveSideMenu}
            width={240}
            trigger={<BackwardFilled className='forward-arrow icon-btn' style={{ fontSize: '3rem' }}/>}
            reverseArrow={true}
          >
            <Menu
             mode="inline" selectable={true}
             onSelect={this.onItemSelect}
             openKeys={openKeys}
             selectedKeys={[noteId]}
            >
              <Menu.Item key="home" icon={<HomeOutlined />} >
                Home
              </Menu.Item>
              <Menu.Item key="new_notebook" icon={<FolderAddOutlined />} onClick={this.setNewFolderPopupVisibility.bind(this, true)}>
                New Note Book
              </Menu.Item>
              {!!isDirPage && <Menu.Item key="new_note" icon={<FileAddOutlined/>} onClick={this.setNewNotePopupVisibility.bind(this, true)}>
                New Note
              </Menu.Item>}
              {!!isNotePage && <Menu.Item key="save" icon={<SaveOutlined/>} onClick={this.saveCurrent}>
                Save
              </Menu.Item>}
              {renderedMenu}
            </Menu>
          </Sider>

          {/* Modules */}
          <Layout className="site-layout module-frame">
            {!!ready && 
            <Routes
              dirTable={dirTable}
              rootKey={this.rootKey}
              fetchMenuFromRear={this.fetchMenuFromRear}
            />}
          </Layout>
        </Layout>

        {/* popups */}
        <InputPopup 
          visible={this.state.newFolderPopupVisible} 
          title="Create a new notebook."
          placeholder="Give a name for your new notebook"
          onCancel={this.setNewFolderPopupVisibility.bind(this, false)}
          callback={createDir}
          async={true}
          afterSuccess={this.fetchMenuFromRear}
          key={Math.random()}
          maxLength={50}
        />

        <InputPopup 
          visible={this.state.newNotePopupVisible} 
          title="Create a new note."
          placeholder="Give a name for your new note"
          onCancel={this.setNewNotePopupVisibility.bind(this, false)}
          callback={createNote.bind(this, initialText, dirId)}
          async={true}
          afterSuccess={this.fetchMenuFromRear}
          key={Math.random()}
          maxLength={50}
        />
      </div>
    );
  }
}

export default withRouter(App);
