import React from 'react';
import CodeMirror from 'react-codemirror';
import templetes from './templates.js';
import { Menu, Dropdown } from 'antd';
import startingText from './startingText';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css'
import './style.scss';

const options = {
  lineNumbers: false,
  readOnly: false,
  mode: 'markdown',
  theme: 'darcula',
  scrollbarStyle: 'null',
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
    try {
      window.codeMirror = this.editorRef.current.getCodeMirror();
      const last_text = window.localStorage.getItem('mkEditor_last_time');
      const doc = this.editorRef.current.getCodeMirror().getDoc();
      if (last_text) {
        doc.setValue(last_text);
      } else { 
        doc.setValue(startingText);
      }
      this.props.onChange(doc.getValue());
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

  handleInsert = ({ key }) => {
    const text = templetes[key];
    if (!!text) this.insertTextAtCursor(text);
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

  onFocusChange = (focus) => {
    if (focus) return;
    // when the editor loses focus, store the current value in local storage
    try {
      const doc = this.editorRef.current.getCodeMirror().getDoc();
      const text = doc.getValue();
      window.localStorage.setItem('mkEditor_last_time', text);;
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return(
      <div className='mk-editor' style={{fontSize: this.state.fontSize + 'px'}}>
        <div className='top-bar'>
          Insert:
          <Dropdown overlay={this.headingMenu} trigger={['click']}>
            <span className='option'>Heading</span>
          </Dropdown>
          <Dropdown overlay={this.listMenu} trigger={['click']}>
            <span className='option'>List</span>
          </Dropdown>
          <span className='option' onClick={this.handleInsert.bind(this, {key: 'pic'})}>Picture</span>
          <span className='option' onClick={this.handleInsert.bind(this, {key: 'link'})}>Link</span>
          <span className='option' onClick={this.handleInsert.bind(this, {key: 'line'})}>Line</span>
          <span className='gap'></span>
          Font size:
          <span className='option' onClick={this.incFontSize}>+</span>
          <span className='option' onClick={this.resetFontSize}>Reset</span>
          <span className='option' onClick={this.decFontSize}>-</span>
        </div>
        <CodeMirror 
          ref={this.editorRef}
          onChange={this.onChange}
          options={options} 
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }

};


export default MkEditor;