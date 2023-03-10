import React from 'react';

class Router extends React.Component {
constructor() {
super();
this._default = '';
this._routes = [];
this.state = {
view: null
};
}

add(url, view) {
    this._routes.push({'url':url, 'view':view});
}

default(url) {
    this._default = url;
}

async componentDidMount() {
    const url = window.location.pathname;
    let view = null;

    if (url === '') {
        url = this._default;
    }

    this._routes.forEach(route => {
        if (route.url === url) {
            view = route.view;
        }
    });

    if (view !== null) {
        await import('./../page/' + view + '/component.js');
        const NodeView = React.lazy(() => import('./../page/' + view + '/component.js'));
        this.setState({view: <NodeView />});
    }
}

render() {
    return (
        <div id="app">
            {this.state.view}
        </div>
    );
}
}

export default Router;