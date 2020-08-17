import React from 'react';
import {
  FolderOpenTwoTone,
  FileMarkdownTwoTone,
  DeleteOutlined,
  RollbackOutlined
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { notify } from '../notification';
import { deleteDir, deleteNote, renameDir, renameNote } from '../api/client.js';
import InputPopupWrapper from '../inputPopup/InputPopupWrapper';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

import './style.scss';

class DirModule extends React.Component {

  renderChildren = (children, dirId) => {

    const { history } = this.props;
    const arrD = [];
    const arrN = [];

    children.sort((a, b) => ('' + a.name).localeCompare('' + b.name));
    for (let child of children) {
      if (child.type === 'DIR') {
        arrD.push(
          <div className="unit" key={child.id}>
            <div>
              <FolderOpenTwoTone 
                style={{fontSize: '50px'}} 
                className="pointer"
                onClick={() => { history.push(`/dir/${child.id}`); }}
              />
            </div>
            <div 
              className="file-name pointer"
              onClick={() => {history.push(`/dir/${child.id}`); }}
            >{child.name}</div>
            <div className="lower-buttons">
              {this.renderRenameButtonForNotebook(renameDir.bind(this, child.id), child.name)}
            </div>
            {this.renderDeleteButtonForNotebook(this.onDirDelete.bind(this, child.id))}
          </div>
        );
      } else {
        arrN.push(
          <div className="unit" key={child.id}>
            <div>
              <FileMarkdownTwoTone 
                style={{fontSize: '50px'}} 
                className="pointer"
                twoToneColor="#ffd152"
                onClick={() => { history.push(`/note/${child.id}`); }}
              />
            </div>
            <div 
              className="file-name pointer"
              onClick={() => { history.push(`/note/${child.id}`); }}
            >{child.name}</div>
            <div className="lower-buttons">
              {this.renderRenameButtonForNote(renameNote.bind(this, child.id), child.name)}
            </div>
            {this.renderDeleteButtonForNote(this.onNoteDelete.bind(this, child.id))}
          </div>
        );
      }
    }
    const arr = [...arrD, ...arrN];
    if (dirId !== '00000000-0000-0000-0000-000000000000') {
      arr.unshift( 
        <div className="unit" key="return">
          <div>
            <RollbackOutlined 
              className="pointer" 
              style={{fontSize: '50px', color: '#1790ff'}} 
              onClick={ () => { history.push(`/root`)} }
            />
          </div>
          <div 
            className="file-name pointer"
            onClick={ () => { history.push(`/root`)} }
          >Return</div>
        </div>
      );
    }
    return arr;
  }

  renderDeleteButtonForNotebook = (handleDelete) => {
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

  renderDeleteButtonForNote = (handleDelete) => {
    const content = (
      <Popconfirm title="Sure to delete this note?" onConfirm={handleDelete}>
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

  renderRenameButtonForNotebook = (handleRename, oldName) => {
    const content = (
      <InputPopupWrapper 
        title="Rename notebook"
        placeholder="Give a new name for your notebook"
        initialValue={oldName}
        callback={handleRename}
        async={true}
        afterSuccess={this.props.updateFunction}
        content={<Button size="small">Rename</Button>}
      />
    ); 
    return content;
  }

  renderRenameButtonForNote = (handleRename, oldName) => {
    const content = (
      <InputPopupWrapper 
        title="Rename note"
        placeholder="Give a new name for your note"
        initialValue={oldName}
        callback={handleRename}
        async={true}
        afterSuccess={this.props.updateFunction}
        content={<Button size="small">Rename</Button>}
        maxLength={50}
      />
    ); 
    return content;
  }

  onDirDelete = (id) => {
    deleteDir(id).then((msg) => {
      this.props.updateFunction()
      notify('success', msg);
    });
  }

  onNoteDelete = (id) => {
    deleteNote(id).then((msg) => {
      this.props.updateFunction()
      notify('success', msg);
    });
  }

  render() {

    const { directory } = this.props; 
    const dirName = directory.name;
    const dirId = directory.id;
    const files = this.renderChildren(directory.children, dirId);

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

DirModule.propTypes = {
  directory: PropTypes.object.isRequired,
  updateFunction: PropTypes.func.isRequired,
};

export default withRouter(DirModule);
