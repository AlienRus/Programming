import template from './template.js'

class XInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.addEventListener('change',(event) => {
            event.stopPropagation();
            this._xValue = event.target.value;
        });
    }

    connectedCallback() {  
        this._render();
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {

    }

    attributeChangedCallback(attr, prev, next) {
        
    }

    set xValue(value) {
        this._xValue = value;
        this._render();
    }

    get xValue() {
        return this._xValue;
    }

    _render() {
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(this);
    }
}

customElements.define('x-input',XInput);