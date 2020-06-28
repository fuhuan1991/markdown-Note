import React from 'react';
import InputPopup from './index';

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
    return (
      <InputPopup
        visible={this.state.visible} 
        title={this.props.title}
        initialValue={this.props.initialValue}
        placeholder={this.props.placeholder}
        onCancel={this.hide}
        apiFunction={this.props.apiFunction}
        key={Math.random()}
        afterSuccess={this.props.afterSuccess}
    />);
  }

  render() {
    return (
      <>
        <span onClick={this.show}>
          {this.props.content}
        </span>
        {this.renderModal()}
      </>
    );
  }
}

export default InputPopupWrapper;