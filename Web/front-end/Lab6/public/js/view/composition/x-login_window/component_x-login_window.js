import template from './template.js'

import './../../component/x-button/component.js'
import './../../component/x-input/component.js'
import './../../component/x-text/component.js'

import { UserFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XLoginWindow extends HTMLElement {
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

    async _btn_login_listener(event) {
        event.stopPropagation();
        let login = (this.shadowRoot.childNodes[3].xValue);
        let password = (this.shadowRoot.childNodes[5].xValue);
        let user = UserFactory.createInstance();
        user.setUser(login, password, undefined);
        let result = await user.authQuery();
        if (result.status == 200) {
            localStorage.setItem('AutoSellUserToken', JSON.stringify(result.data));
            let str = "Logined! Please, wait for pesponse...";
            this._render(str);
            let router = RouterFactory.createInstance();
            router.go('main');
        }
        else if (result.status == 401)
        {
            let str = "Failed to Login! Invalid Login or Password.";
            this._render(str);
        }
        else
        {
            let str = "Server error! Try again.";
            this._render(str);
        }
    }

    _btn_register_listener(event) {
        event.stopPropagation();
        let router = RouterFactory.createInstance();
        router.go('register')
    }

    _render(str) {     
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(str);
        this.shadowRoot.childNodes[7].addEventListener('click', this._btn_login_listener.bind(this));
        this.shadowRoot.childNodes[9].addEventListener('click', this._btn_register_listener.bind(this));
    }
}

customElements.define('x-login_window',XLoginWindow);