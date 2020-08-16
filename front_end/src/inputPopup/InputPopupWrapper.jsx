import React from 'react';
import InputPopup from './index';
import PropTypes from 'prop-types';

class InputPopupWrapper extends React.Component {

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

    const { title, initialValue, placeholder, callback, async, afterSuccess, maxLength } = this.props;
    const { visible } = this.state;

    return (
      <InputPopup
        visible={visible} 
        title={title}
        initialValue={initialValue}
        placeholder={placeholder}
        onCancel={this.hide}
        callback={callback}
        async={async}
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

InputPopupWrapper.propTypes = {
  title: PropTypes.string,   
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,   
  callback: PropTypes.func.isRequired,   
  async: PropTypes.bool,  
  afterSuccess: PropTypes.func, 
  content: PropTypes.node.isRequired,
  maxLength: PropTypes.number,
};

InputPopupWrapper.defaultProps = {
  title: '',   
  initialValue: '',
  placeholder: '',  
  async: false,  
  afterSuccess: () => {},  
  maxLength: 1000,
}

export default InputPopupWrapper;