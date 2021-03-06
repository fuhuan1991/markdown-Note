import React from 'react';
import CodeMirror from 'react-codemirror';
import templetes from './templates.js';
import { Menu, Dropdown } from 'antd';
import 'codemirror/mode/markdown/markdown';
import PropTypes from 'prop-types';
import InputPopupWrapper from '../../inputPopup/InputPopupWrapper';
import UploadPopupWrapper from '../../uploadPopup/UploadPopupWrapper';
import {
  EnterOutlined,
  FontSizeOutlined,
} from '@ant-design/icons';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css'
import './style.scss';

const options = {
  lineNumbers: false,
  readOnly: false,
  mode: 'markdown',
  theme: 'darcula',
  scrollbarStyle: 'null',
  lineWrapping: true
}

class MkEditor extends React.Component {

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      fontSize: 16, 
    }
  }

  onChange = (code) => {
    this.props.onChange(code);
  }

  componentDidMount = () => {
    const { initialValue } = this.props;
    try {
      window.codeMirror = this.editorRef.current.getCodeMirror();
      // const last_text = window.localStorage.getItem('mkEditor_last_time');
      const doc = this.editorRef.current.getCodeMirror().getDoc();
      doc.setValue(initialValue)
      this.onChange(doc.getValue());
    } catch(e) {
      console.log(e);
    }
  }

  insertTextAtCursor = (text) => {
    try {
      const doc = this.editorRef.current.getCodeMirror().getDoc();
      const cursor = doc.getCursor();
      doc.replaceRange(text, cursor);
    } catch(e) {
      console.log(e);
    }
  }

  // the function that insert code templates into the editor.
  // key: the type of the template, like "ol" or "table"
  // data: sometimes, the template to be inserted need additional data input, like picture address 
  handleInsert = ({ key }, data) => {
    console.log(data)
    if (key === 'pic') {
      this.insertTextAtCursor(`\n![alt text](${data.value})\n`);
    } else if (key === 'link') {
      this.insertTextAtCursor(`\n[text](${data.value})\n`);
    } else {
      const text = templetes[key];
      if (!!text) this.insertTextAtCursor(text);
    }
  };

  headingMenu = (
    <Menu onClick={this.handleInsert}>
      <Menu.Item key="heading_1">
        Heading level 1
      </Menu.Item>
      <Menu.Item key="heading_2">
        Heading level 2
      </Menu.Item>
      <Menu.Item key="heading_3">
        Heading level 3
      </Menu.Item>
      <Menu.Item key="heading_4">
        Heading level 4
      </Menu.Item>
    </Menu>
  );

  listMenu = (
    <Menu onClick={this.handleInsert}>
      <Menu.Item key="ol">
        Ordered list
      </Menu.Item>
      <Menu.Item key="ul">
        Unordered list
      </Menu.Item>
      <Menu.Item key="check">
        Check list
      </Menu.Item>
    </Menu>
  );

  pictureMenu = (
    <Menu>
      <Menu.Item key="pic_address">
        <InputPopupWrapper 
          title="Insert picture"
          placeholder="Paste the picture link here"
          initialValue={''}
          callback={this.handleInsert.bind(this, {key: 'pic'})}
          async={false}
          content={<span className="drop-down-trigger">Picture from internet</span>}
        />
      </Menu.Item>
      <Menu.Item key="pic_upload">
        <UploadPopupWrapper 
          title="Upload picture"
          callback={this.handleInsert.bind(this, {key: 'pic'})}
          content={<span className="drop-down-trigger">Upload picture</span>}
        />
      </Menu.Item>
    </Menu>
  );

  incFontSize = () => {
    this.setState({ fontSize: this.state.fontSize + 1});
  }

  resetFontSize = () => {
    this.setState({ fontSize: 16});
  }

  decFontSize = () => {
    this.setState({ fontSize: this.state.fontSize - 1});
  }

  render() {

    const { shrink, expand, exportMD } = this.props;
    const { fontSize } = this.state;
    let className = 'mk-editor';

    if (shrink) className += ' shrink';
    if (expand) className += ' expand';

    return(
      <div className={className} style={{fontSize: fontSize + 'px'}}>
        <div className='top-bar'>
          <span className='option' onClick={() => {exportMD()}}>Export</span>
          <span className='gap'></span>
          Insert
          <Dropdown overlay={this.headingMenu} trigger={['click']}>
            <span className='option'>Heading</span>
          </Dropdown>
          <Dropdown overlay={this.listMenu} trigger={['click']}>
            <span className='option'>List</span>
          </Dropdown>
          <Dropdown overlay={this.pictureMenu} trigger={['click']}>
            <span className='option'>Picture</span>
          </Dropdown>
          <InputPopupWrapper 
            title="Insert link"
            placeholder="Paste the link here"
            initialValue={''}
            callback={this.handleInsert.bind(this, {key: 'link'})}
            async={false}
            content={<span className='option'>Link</span>}
          />
          <span className='option' onClick={this.handleInsert.bind(this, {key: 'line'})}>Line</span>
          <span className='option' onClick={this.handleInsert.bind(this, {key: 'table'})}>Table</span>
          <span className='option' onClick={this.handleInsert.bind(this, {key: 'br'})}><EnterOutlined /></span>
          <span className='gap'></span>
          <FontSizeOutlined style={{padding: '8px 6px 0px 0px'}}/>
          <span className='option' onClick={this.incFontSize}>+</span>
          <span className='option' onClick={this.resetFontSize}>Re</span>
          <span className='option' onClick={this.decFontSize}>-</span>
        </div>
        <CodeMirror 
          ref={this.editorRef}
          onChange={this.onChange}
          options={options} 
        />
      </div>
    );
  }
};

MkEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  exportMD: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
  shrink: PropTypes.bool.isRequired,
  expand: PropTypes.bool.isRequired,
};

export default MkEditor;