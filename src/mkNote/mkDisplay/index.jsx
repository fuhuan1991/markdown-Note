import React from 'react';
import Markdown from 'react-markdown';
import './style.scss';

class MkDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontSize: 20, 
    }
  }

  incFontSize = () => {
    this.setState({ fontSize: this.state.fontSize + 1});
  }

  resetFontSize = () => {
    this.setState({ fontSize: 16});
  }

  decFontSize = () => {
    this.setState({ fontSize: this.state.fontSize - 1});
  }

  render () {
    const { shrink, expand, source } = this.props;
    const { fontSize } = this.state;
    let className = 'mk-display';

    if (shrink) className += ' shrink';
    if (expand) className += ' expand';

    return (
      <div className={className} style={{fontSize: fontSize + 'px'}}>
        <div className="font-size" >
          Font size:
          <span className='option' onClick={this.incFontSize}>+</span>
          <span className='option' onClick={this.resetFontSize}>Reset</span>
          <span className='option' onClick={this.decFontSize}>-</span>
        </div>
        <Markdown source={source} escapeHtml={false}/>
      </div>
    );
  }
}

export default MkDisplay;