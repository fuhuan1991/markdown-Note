import React from 'react';
import {
  FolderOpenTwoTone,
  FileTextTwoTone,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { notify } from '../notification';
import { deleteDir } from '../api/client.js';
import './style.scss';

class DirModule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderChildren = (children) => {
    const arr = [];
    children.sort((a, b) => ('' + a.name).localeCompare(b.name));
    for (let child of children) {
      // console.log(child); 
      if (child.type === 'DIR') {
        arr.push(
          <div className="unit" key={child.id}>
            <div>
              <FolderOpenTwoTone style={{fontSize: '50px'}}/>
            </div>
            <div className="file-name">{child.name}</div>
            <div className="lower-buttons">
              <Button type="primary" size="small">Inspect</Button>
              <Button size="small">Rename</Button>
            </div>
            {this.renderDeleteButton(this.onDelete.bind(this, child.id))}
          </div>
        );
      } else {
        arr.push(
          <div key={child.id}>
            <FileTextTwoTone />
            {child.name}
          </div>
        );
      }
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

  onDelete = (id) => {
    deleteDir(id).then((msg) => {
      this.props.updateFunction()
      notify('success', msg);
    });
  }


  render() {
    console.log('Directory', this.props.directory)     
    const dirName = this.props.directory.name;
    // const dirId = this.props.directory.id;
    const files = this.renderChildren(this.props.directory.files);


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
