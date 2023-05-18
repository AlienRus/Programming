import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./ui/router/router";
//import {Provider} from "react-redux";
import { buildProvider } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Provider = buildProvider(); //мобикс

root.render(
  //<Provider store={api}>
  //мобикс
  <Provider>
    <React.StrictMode>
      <Router></Router>
    </React.StrictMode>
  </Provider> //мобикс
  //</Provider>
);