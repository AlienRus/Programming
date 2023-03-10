import React from 'react';
import ReactDOM from 'react-dom';
import XLogin from './components/x-login';
import XRegister from './components/x-register';
import XMain from './components/x-main';

class Router {
  constructor() {
    this._default = '';
    this._routes = [];
  }

  add(url, component) {
    this._routes.push({ url: url, component: component });
  }

  default(url) {
    this._default = url;
  }

  async go(url = '') {
    let component = null;

    if (url === '') {
      url = this._default;
    }

    this._routes.forEach(route => {
      if (route.url === url) {
        component = route.component;
      }
    });

    if (component !== null) {
      let nodeView = React.createElement(component);
      let nodeApp = document.getElementById('app');
      ReactDOM.render(nodeView, nodeApp);
      history.pushState(null, null, url);
    }
  }
}

let router = new Router();

router.add('login', XLogin);
router.add('register', XRegister);
router.add('main', XMain);

router.default('login');

router.go();

