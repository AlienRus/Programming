import template from './template.js'

import { ProductFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XTable extends HTMLElement {
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

    async _btn_delete_listener(id) {
        let deleteButtonValue = id;
        console.log(deleteButtonValue);
        let product = ProductFactory.createInstance();
        let result = await product.delete(deleteButtonValue);
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

    async _render() {
        if(!this.ownerDocument.defaultView) return;
        let product = ProductFactory.createInstance();
        let result = await product.getList();
        if (result.status == 200) {
            this.shadowRoot.innerHTML = template(result);
        }
        else {
            localStorage.removeItem('AutoSellUserToken');
            let router = RouterFactory.createInstance();
            router.go('login')
        }
        let count = 2;
        result.data.forEach(function(item) {
            count = count + 2;
        });
        for (let i = 2; i < count; i = i + 2) {
            this.shadowRoot.childNodes[1].childNodes[3].childNodes[3].childNodes[i].childNodes[4].childNodes[0].addEventListener('click', this._btn_delete_listener.bind(this, this.shadowRoot.childNodes[1].childNodes[3].childNodes[3].childNodes[i].childNodes[4].childNodes[0].value));
        }

    }
}

customElements.define('x-table',XTable);