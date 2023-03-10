import React from 'react';
import template from './template.js';

class XText extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  
  componentDidMount() {
    this._render();
  }
  
  componentWillUnmount() {
    
  }
  
  render() {
    return <div ref={this.ref}></div>;
  }
  
  _render() {
    if (!this.ref.current) return;
    this.ref.current.innerHTML = template(this);
  }
}

export default XText;
