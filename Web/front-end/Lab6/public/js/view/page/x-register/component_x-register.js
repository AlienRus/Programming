import template from './template.js'
import '../../composition/x-register_window/component.js'

class XRegister extends HTMLElement {
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
        if (!this.ownerDocument.defaultView) return;    
        this.shadowRoot.innerHTML = template(this);      
    }
}

customElements.define('x-register',XRegister);