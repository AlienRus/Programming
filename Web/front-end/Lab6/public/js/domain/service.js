import { useState } from "react";

const StoreContext = React.createContext();

class Store {
  constructor() {
    this._callbacks = [];
  }

  _emit(state) {
    this._callbacks.forEach((callback) => callback(state));
  }

  subscribe(callback) {
    this._callbacks.push(callback);
  }
}

class User extends Store {
  constructor() {
    super();
    this.user = {
      login: undefined,
      password: undefined,
      email: undefined,
    };
  }

  setUser(login, password, email) {
    this.user = {
      login: login,
      password: password,
      email: email,
    };
  }

  authQuery() {
    return new Promise((resolve) => {
      let status;
      fetch("api/users/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(this.user),
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((data) => {
          let result = {
            status: status,
            data: data,
          };
          resolve(result);
        });
    });
  }

  registerQuery() {
    return new Promise((resolve) => {
      let status;
      fetch("api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(this.user),
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((data) => {
          let result = {
            status: status,
            data: data,
          };
          resolve(result);
        });
    });
  }
}

class Product extends Store {
  constructor() {
    super();
    this.product = {
      name: undefined,
      price: undefined,
      description: undefined,
    };
  }

  setProduct(name, price, description) {
    this.product = {
      name: name,
      price: price,
      description: description,
    };
  }

  getList() {
    return new Promise((resolve) => {
      let status;
      fetch("api/product/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-token": localStorage.getItem("AutoSellUserToken"),
        },
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((data) => {
          let result = {
            status: status,
            data: data,
          };
          resolve(result);
        });
    });
  }

  delete(deleteButtonValue) {
    return new Promise((resolve) => {
      let status;
      fetch("api/product/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-token": localStorage.getItem("AutoSellUserToken"),
          "Delete-row": parseInt(deleteButtonValue),
        },
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((data) => {
          let result = {
            status: status,
            data: data,
          };
          resolve(result);
        });
    });
  }

  add() {
    return new Promise((resolve) => {
      let status;
      fetch("api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-token": localStorage.getItem("Auto
