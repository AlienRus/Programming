import template from './template.js'
import '../../composition/x-login_window/component.js'

class XLogin extends HTMLElement {
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

customElements.define('x-login',XLogin);