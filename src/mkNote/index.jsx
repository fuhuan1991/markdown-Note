import React from 'react';
import MkEditor from './mkEditor/index';
import MkDisplay from './mkDisplay/index';
import PropTypes from 'prop-types';
import { getContent } from '../api/client';
import { Spin, Slider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { updateNote } from '../api/client';
import { withRouter } from "react-router";
import { notify } from '../notification';
import { saveAs } from 'file-saver';

import './style.scss';

const Loading = <LoadingOutlined style={{ fontSize: 120 }} spin />;

class MkNote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: '',
      ready: false,
      changed: false,
      sizeConfig: 1,
      title: 'unknown',
    }
  }

  componentDidMount() {
    const { noteId } = this.props;
    this.getNewContent(noteId);
  }

  componentDidUpdate(prevProps) {
    const { noteId } = this.props;
    const { noteId: oldId } = prevProps;

    if (oldId !== noteId) {
      this.getNewContent(noteId);
    }
  }

  getNewContent = (noteId) => {
    this.setState({
      ready: false,
    });
    getContent(noteId).then(
      (res) => {
        this.setState({
          source: res.text,
          ready: true,
          changed: false,
          title: res.title,
        });
      },
      () => {
        this.props.history.push('/');
      }
    );
  }

  onEditorChange = (code) => {
    if (this.state.source === code) return;
    this.setState({
      source: code,
      changed: true,
    });
  }

  shouldComponentUpdate(nextProps) {

    // auto saving
    if (nextProps.location.pathname !== this.props.location.pathname) {

      const doc = window.codeMirror.getDoc();
      const noteId = this.props.location.pathname.slice(6);
      const changed = this.state.changed;
  
      if (!doc || !noteId || noteId.length < 1 || !changed) return true;
  
      const text = doc.getValue();
      updateNote(noteId, text).then(
        (res) => {
          notify('success', "Auto saving completed \n" + res);
        },
        () => {
          notify('error', 'update failed, try again later');
        }
      );
    }
    return true;
  }

  componentWillUnmount() {
    // auto saving
    const doc = window.codeMirror.getDoc();
    const noteId = this.props.location.pathname.slice(6);
    const changed = this.state.changed;

    if (!doc || !noteId || noteId.length < 1 || !changed) return true;

    const text = doc.getValue();
    updateNote(noteId, text).then(
      (res) => {
        notify('success', "Auto saving completed \n" + res);
      },
      () => {
        notify('error', 'update failed, try again later');
      }
    );
  }

  sizeChange = (v) => {
    this.setState({sizeConfig: v});
  }

  exportMD = () => {
    const blob = new Blob([this.state.source], {type: "text/plain;charset=utf-8"});
    saveAs(blob, this.state.title + ".md");
  }

  render() {

    const { source, ready, sizeConfig } = this.state;

    return (
      <div className="main mk-mode">
        {!ready && <Spin indicator={Loading} />}
        {!!ready && 
          <>
            <MkEditor 
              onChange={this.onEditorChange}
              exportMD={this.exportMD}
              initialValue={source} 
              shrink={sizeConfig === 0}
              expand={sizeConfig === 2}
            />
            <MkDisplay 
              source={this.state.source} 
              shrink={sizeConfig === 2}
              expand={sizeConfig === 0}
            />
            <div className="slider-bar">
              <Slider 
                max={2} 
                defaultValue={1} 
                included={false}
                tooltipVisible={false} 
                onChange={this.sizeChange}
                value={sizeConfig}
              />
            </div>
          </>
        }
      </div>
    );
  }
}

MkNote.propTypes = {
  noteId: PropTypes.string,
};

export default withRouter(MkNote);
