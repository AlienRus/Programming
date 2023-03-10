import React from 'react';
import template from './template.js'

class XButton extends React.Component {
constructor() {
super();
this.state = {};
}

javascript
componentDidMount() {
    this._render();
}

componentWillUnmount() {

}

static get observedAttributes() {
    return [];
}

attributeChangedCallback(attr, prev, next) {

}

_render() {
    if(!this.ownerDocument.defaultView) return;
    this.setState({template: template(this)});
}

render() {
    return <div dangerouslySetInnerHTML={{__html: this.state.template}} />;
}
}

export default XButton;