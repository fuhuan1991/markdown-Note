import React from 'react';
import {
  FolderOpenTwoTone,
  FileTextTwoTone,
  DeleteOutlined,
  RollbackOutlined
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { notify } from '../notification';
import { deleteDir, renameDir } from '../api/client.js';
import InputPopupWrapper from '../inputPopup/InputPopupWrapper';

import './style.scss';

class DirModule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderChildren = (children, dirId) => {
    const arrD = [];
    const arrN = [];
    children.sort((a, b) => ('' + a.name).localeCompare(b.name));
    for (let child of children) {
      if (child.type === 'DIR') {
        arrD.push(
          <div className="unit" key={child.id}>
            <div>
              <FolderOpenTwoTone style={{fontSize: '50px'}} />
            </div>
            <div className="file-name">{child.name}</div>
            <div className="lower-buttons">
              <Button type="primary" size="small" onClick={this.props.onDirInspect.bind(this, child.id)}>Inspect</Button>
              {this.renderRenameButton(renameDir.bind(this, child.id), child.name)}
            </div>
            {this.renderDeleteButton(this.onDelete.bind(this, child.id))}
          </div>
        );
      } else {
        arrN.push(
          <div className="unit" key={child.id}>
            <div>
              <FileTextTwoTone style={{fontSize: '50px'}} twoToneColor="#ffd152"/>
            </div>
            <div className="file-name">{child.name}</div>
            <div className="lower-buttons">
              <Button type="primary" size="small">Edit</Button>
              {/* {this.renderRenameButton(renameDir.bind(this, child.id), child.name)} */}
            </div>
            {/* {this.renderDeleteButton(this.onDelete.bind(this, child.id))} */}
          </div>
        );
      }
    }
    const arr = [...arrD, ...arrN];
    if (dirId !== '00000000-0000-0000-0000-000000000000') {
      arr.unshift( 
        <div 
          className="unit" 
          key="return" 
          style={{cursor: 'pointer'}} 
          onClick={this.props.onDirInspect.bind(this, '00000000-0000-0000-0000-000000000000')}
        >
          <div>
            <RollbackOutlined style={{fontSize: '50px', color: '#1790ff'}} />
          </div>
          <div className="file-name">Return</div>
        </div>
      );
    }
    return arr;
  }

  renderDeleteButton = (handleDelete) => {
    const content = (
      <Popconfirm title="Sure to delete this notebook?" onConfirm={handleDelete}>
        <Button 
          danger 
          type="primary" 
          size="small"
        >
          <DeleteOutlined />
        </Button>
      </Popconfirm>);

    return content;
  }

  renderRenameButton = (handleRename, oldName) => {
    const content = (
      <InputPopupWrapper 
        title="Rename note"
        placeholder="Give a new name for your notebook"
        initialValue={oldName}
        apiFunction={handleRename}
        afterSuccess={this.props.updateFunction}
        content={<Button size="small">Rename</Button>}
      />
    ); 
    return content;
  }

  onDelete = (id) => {
    deleteDir(id).then((msg) => {
      this.props.updateFunction()
      notify('success', msg);
    });
  }

  render() {
    console.log('Directory', this.props.directory)     
    const dirName = this.props.directory.name;
    const dirId = this.props.directory.id;
    const files = this.renderChildren(this.props.directory.files, dirId);

    return (
      <div className='dir-module'>
        <h1>Notebook: {dirName}</h1>
        <div className="fileContainer">
          {files}
        </div>
      </div>
    );
  }
}

export default DirModule;
