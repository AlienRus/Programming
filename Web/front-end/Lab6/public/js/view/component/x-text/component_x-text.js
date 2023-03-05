import template from './template.js'

class XText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
        this._render();
    }
    
    disconnectedCallback() {

    }
    
    static get observedAttributes() {
        return [];
    }
    
    attributeChangedCallback(attr, prev, next) {

    }
    
    _render() {
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(this);
    }
}

customElements.define('x-text', XText);