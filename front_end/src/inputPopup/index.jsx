import { Modal, Input } from 'antd';
import React from 'react';
import { notify } from '../notification';

class InputPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      value: this.props.initialValue,
    }
  }

  handleOk = () => {
    const value = this.state.value;
    if (value === null || value.trim().length === 0) { 
      notify('error', 'invalid input');
      return;
    }

    this.setState({ confirmLoading: true });
    this.props.apiFunction({ value })
    .then(
      (res) => {
        this.setState({ confirmLoading: false });
        notify('success', res);
        this.handleCancel();
        if (typeof this.props.afterSuccess === 'function') this.props.afterSuccess();
      }, 
      (e) => { 
        this.setState({ confirmLoading: false }); 
      }
    );
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { confirmLoading } = this.state;
    return (
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Input 
            value={this.state.value} 
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            onPressEnter={this.handleOk}
          />
        </Modal>
    );
  }
}

export default InputPopup;