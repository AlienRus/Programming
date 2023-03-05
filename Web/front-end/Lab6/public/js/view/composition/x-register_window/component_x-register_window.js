import template from './template.js'

import './../../component/x-button/component.js'
import './../../component/x-input/component.js'
import './../../component/x-text/component.js'

import { UserFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XRegisterWindow extends HTMLElement {
    constructor() {  
        super();   
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {  
        let str = "";
        this._render(str);
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, prev, next) {

    }

    async _btn_register_listener(event) {
        event.stopPropagation();
        let login = (this.shadowRoot.childNodes[3].xValue);
        let password = (this.shadowRoot.childNodes[5].xValue);
        let email = (this.shadowRoot.childNodes[7].xValue);
        let user = UserFactory.createInstance();
        user.setUser(login, password, email);
        let result = await user.registerQuery();
        if (result.status == 200) {
            let str = "Register is complete! Please, go back to login.";
            this._render(str);
        }
        else if (result.status == 401) {
            let str = "User already exist! Try another login or email.";
            this._render(str);
        }
        else {
            let str = "Server error! Try again.";
            this._render(str);
        }
    }

    _btn_back_listener(event) {
        event.stopPropagation();
        let router = RouterFactory.createInstance();
        router.go('login')
    }

    _render(str) {     
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(str);
        this.shadowRoot.childNodes[9].addEventListener('click', this._btn_register_listener.bind(this));
        this.shadowRoot.childNodes[11].addEventListener('click', this._btn_back_listener.bind(this));
    }
}

customElements.define('x-register_window',XRegisterWindow);