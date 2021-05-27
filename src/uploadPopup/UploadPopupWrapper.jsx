import React from 'react';
import UploadPopup from './index';
import PropTypes from 'prop-types';

class UploadPopupWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  show = () => {
    this.setState({ visible: true });
  }

  hide = () => {
    this.setState({ visible: false });
  }

  renderModal = () => {

    const { title, callback, afterSuccess, maxLength } = this.props;
    const { visible } = this.state;

    return (
      <UploadPopup
        visible={visible} 
        title={title}
        onCancel={this.hide}
        callback={callback}
        afterSuccess={afterSuccess}
        maxLength={maxLength}
        key={Math.random()}
    />);
  }

  render() {

    const { content } = this.props;
    const newContent = React.cloneElement(content, {
      onClick: this.show,
    });

    return (
      <>
        {newContent}
        {this.renderModal()}
      </>
    );
  }
}

UploadPopupWrapper.propTypes = {
  title: PropTypes.string,   
  afterSuccess: PropTypes.func, 
  content: PropTypes.node.isRequired,
  maxLength: PropTypes.number,
};

UploadPopupWrapper.defaultProps = {
  title: '',   
  afterSuccess: () => {},  
  maxLength: 1000,
}

export default UploadPopupWrapper;