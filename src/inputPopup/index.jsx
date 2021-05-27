import { Modal, Input } from 'antd';
import React from 'react';
import { notify } from '../notification';
import PropTypes from 'prop-types';

// This is a popup component that contains a input slot. 
// After confirmation, the input value will be passed to the callback function.
// The callback function can be either sync or async.

class InputPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      value: this.props.initialValue,
    }
  }

  // callback will be triggered first, if this callback is async, 'afterSuccess' will be triggered after a successful callback
  handleOk = () => {

    const { callback, async, afterSuccess, maxLength } = this.props;
    const { value } = this.state;

    if (value === null || value.trim().length === 0) { 
      notify('error', 'invalid input');
      return;
    }

    if (value.trim().length > maxLength) {
      const max = maxLength ? maxLength : 1000;
      notify('error', 'input should be shorter than ' + max);
      return;
    }

    if (async) {
      // the callback function is a async function
      this.setState({ confirmLoading: true });
      callback({ value })
      .then(
        (res) => {
          this.setState({ confirmLoading: false });
          notify('success', res);
          this.handleCancel();
          if (typeof afterSuccess === 'function') afterSuccess();
        }, 
        (e) => { 
          notify('error', e);
          this.setState({ confirmLoading: false }); 
        }
      );
    } else {
      callback({ value });
      this.handleCancel();
      if (typeof afterSuccess === 'function') afterSuccess();
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {

    const { confirmLoading, value } = this.state;
    const { title, visible, placeholder } = this.props;

    return (
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Input 
            value={value} 
            placeholder={placeholder}
            onChange={this.onChange}
            onPressEnter={this.handleOk}
          />
        </Modal>
    );
  }
}

InputPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,   
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,   
  onCancel: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,   
  async: PropTypes.bool,  
  afterSuccess: PropTypes.func, 
  maxLength: PropTypes.number,
};

InputPopup.defaultProps = {
  title: '',   
  initialValue: '',
  placeholder: '',  
  async: false,  
  afterSuccess: () => {},  
  maxLength: 1000,
}

export default InputPopup;