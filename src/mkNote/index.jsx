import React from 'react';
import MkEditor from './mkEditor/index';
import MkDisplay from './mkDisplay/index';
import './style.scss';

class MkNote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: '',
    }
  }

  onEditorChange = (code) => {
    this.setState({
      source: code,
    });
  }

  render() {
    const className = this.props.isSidebarDeployed ? 'main mk-mode side-bar-deployed' : 'main mk-mode';
    return (
      <div className={className}>
        <MkEditor onChange={this.onEditorChange} />
        <MkDisplay source={this.state.source} />
      </div>
    );
  }
}

export default MkNote;
