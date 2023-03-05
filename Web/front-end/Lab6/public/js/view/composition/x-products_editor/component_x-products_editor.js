import template from './template.js'

import './../../component/x-button/component.js'
import './../../component/x-input/component.js'
import './../../component/x-table/component.js'

import { ProductFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XProductsEditor extends HTMLElement {
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

    async _btn_add_listener(event) {
        event.stopPropagation();
        let name = (this.shadowRoot.childNodes[3].xValue);
        let price = (this.shadowRoot.childNodes[5].xValue);
        let description = (this.shadowRoot.childNodes[7].xValue);
        let product = ProductFactory.createInstance();
        product.setProduct(name, price, description);
        let result = await product.add();
        if(result.status == 200) {
            this._render();
        } else if(result.status == 401) {
            localStorage.removeItem('AutoSellUserToken');
            let router = RouterFactory.createInstance();
            router.go('login');
        } else {
            this._render();
        }
    }

    _btn_exit_listener(event) {
        event.stopPropagation();
        localStorage.removeItem('AutoSellUserToken');
        let router = RouterFactory.createInstance();
        router.go('login');
    }

    _render() {     
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(this);
        this.shadowRoot.childNodes[1].addEventListener('click', this._btn_exit_listener.bind(this));
        this.shadowRoot.childNodes[9].addEventListener('click', this._btn_add_listener.bind(this));
    }
}

customElements.define('x-products_editor', XProductsEditor);