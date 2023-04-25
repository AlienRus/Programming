import {useState,useEffect} from 'react';
import {observable,action,autorun } from 'mobx';

const store = observable({
    role : null,

    login : null,

    idProdA : null,

    idProdU : null,

    Prod : [],

    orderU : {
        prod : []
    },

    orderA : {
        prod : []
    },

    changeRole: action( function change(value) {
        this.role = value;
    }),
    changeLogin: action( function change(value) {
        this.login = value;
    }),
    changeIdProdA: action( function change(value) {
        this.idProdA = value;
    }),
    changeIdProdU: action( function change(value) {
        this.idProdU = value;
    }),
    changeProd: action( function change(value) {
        this.Prod = value;
    }),
    changeOrderU: action( function change(value) {
        this.orderU = value;
    }),
    changeOrderA: action( function change(value) {
        this.orderA = value;
    }),
});

function buildProvider() {
    return (props)=> {
        return (
            <>
                {props.children}
            </>
        );
    };
}

function useListenerProd(){
    const [_item,update] = useState(store.Prod);
    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun(() => {
            handle(store.Prod);
        })
    },[]);
    return _item;
}

function useListenerOrderA(){
    const [_item,update] = useState(store.orderA);
    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun(() => {
            handle(store.orderA);
        })
    },[]);
    return _item;
}

function useListenerIdProdA(){
    const [_item,update] = useState(store.idProdA);
    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun(() => {
            handle(store.idProdA);
        })
    },[]);
    return _item;
}

function useListenerOrderU(){
    const [_item,update] = useState(store.orderU);
    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun(() => {
            handle(store.orderU);
        })
    },[]);
    return _item;
}

function useListenerIdProdU(){
    const [_item,update] = useState(store.idProdU);
    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun(() => {
            handle(store.idProdU);
        })
    },[]);
    return _item;
}

function useListener(item) {
    const [_item,update] = useState(undefined);

    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun(() => {
            if (item === "role") {
                handle(store.role);
            } else if (item === "login") {
                handle(store.login);
            } else if (item === "idProdA") {
                handle(store.idProdA);
            } else if (item === "idProdU") {
                handle(store.idProdU);
            } else if (item === "Prod") {
                handle(store.Prod);
            } else if (item === "orderU") {
                handle(store.orderU);
            } else if (item === "orderA") {
                handle(store.orderA);
            }
        });
    },[]);

    return _item;
}

// изменение состояния
function useDispatcher(item) { 
    return (value) => {
        if (item === "role"){
            store.changeRole(value);
        }
        else if (item === "login"){
            store.changeLogin(value);
        }
        else if (item === "idProdA"){
            store.changeIdProdA(value);
        }
        else if (item === "idProdU"){
            store.changeIdProdU(value);
        }
        else if (item === "Prod"){
            store.changeProd(value);
        }
        else if (item === "orderU"){
            store.changeOrderU(value);
        }
        else if (item === "orderA"){
            store.changeOrderA(value);
        }
    };
}

export {buildProvider, useListener, useDispatcher, useListenerProd, useListenerOrderA, useListenerIdProdA, useListenerOrderU, useListenerIdProdU}



/*redux*/
/*
import {createStore} from "redux";

const defaultState = {
    role : null,

    login : null,

    idProdA : null,

    idProdU : null,

    Prod : [],

    orderU : {
        prod : []
    },

    orderA : {
        prod : []
    }
}

const reducer = (state = defaultState, action) => {
    switch (action.type){
        case "setRole":
            return{...state, role: action.payload}
        case "setLogin":
            return{...state, login: action.payload}
        case "setProducts":
            return{...state, Prod: action.payload}
        case "setOrderU":
            return{...state, orderU: action.payload}
        case "setOrderA":
            return{...state, orderA: action.payload}
        case "setIdProdA":
            return{...state, idProdA: action.payload}
        case "setIdProdU":
            return{...state, idProdU: action.payload}
        default:
            return state
    }
}

export const api = createStore(reducer);
 */
/*redux*/