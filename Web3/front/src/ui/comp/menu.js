import React from 'react';
import close from "../../img/close.png";
import product_u from "../../img/product.png";
import orders_u from "../../img/shopping-bag.png"
import cart_u from "../../img/shopping-cart.png"
import products_a from "../../img/in-stock.png"
import add_product_a from "../../img/add-package.png"
import orders_a from "../../img/order.png"
import users_a from "../../img/people.png"
import "../../css/menu.css"
import {useNavigate} from "react-router-dom";
//import {useDispatch, useSelector} from "react-redux";
import {useDispatcher, useListener} from "../../store/store";

const Menu = function (props) {

    const router = useNavigate();


    //мобикс
    const login = useListener("login");

    const setRole = useDispatcher("role");

    /* редакс
    const login = useSelector(state => state.login);

    const dispatch = useDispatch();

    const setRole = () => {
        dispatch({type: "setRole", payload: ""})
    }
     */

    return (
        <div>
            <div className="area"></div>
            <nav className="main-menu">
                <ul className="login_">
                    <li><i className="fa fa-power-off fa-2x"></i><span className="nav-text">{login}</span></li>
                </ul>
                {(props.role === "user")
                    ?
                    <ul className="menu_">
                        <li onClick={() => router("/UserCatalog")}><a><img src={product_u}></img><i
                            className="fa fa-home fa-2x"></i><span className="nav-text">Список товаров</span></a></li>
                        <li onClick={() => router("/UserBasket")} className="has-subnav"><a><img src={cart_u}></img><i
                            className="fa fa-globe fa-2x"></i><span className="nav-text">Корзина</span></a></li>
                        <li onClick={() => router("/UserOrders")} className="has-subnav"><a><img src={orders_u}></img><i
                            className="fa fa-comments fa-2x"></i><span className="nav-text">Заказы</span></a></li>
                    </ul>
                    :
                    <ul className="menu_">
                        <li onClick={() => router("/AdminCatalog")}><a><img src={products_a}></img><i
                            className="fa fa-home fa-2x"></i><span className="nav-text">Список товаров</span></a></li>
                        <li onClick={() => router("/AdminAddProduct")} className="has-subnav"><a><img src={add_product_a}></img><i
                            className="fa fa-globe fa-2x"></i><span className="nav-text">Добавить товар</span></a></li>
                        <li onClick={() => router("/AdminOrders")} className="has-subnav"><a><img src={orders_a}></img><i
                            className="fa fa-comments fa-2x"></i><span className="nav-text">Заказы</span></a></li>
                        <li onClick={() => router("/AdminUsers")} className="has-subnav"><a><img src={users_a}></img><i
                            className="fa fa-comments fa-2x"></i><span className="nav-text">Пользователи</span></a></li>
                    </ul>
                }
                <ul className="logout">
                    <li onClick={() => {router("/Authorization"); setRole("");}} className="has-subnav"><a><img src={close}></img><i
                        className="fa fa-comments fa-2x"></i><span className="nav-text">Выход</span></a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu