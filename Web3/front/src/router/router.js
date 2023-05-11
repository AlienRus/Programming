import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Authorization from "../ui/page/Authorization";
import Registration from "../ui/page/Registration";
import UserCatalog from "../ui/page/UserCatalog";
import UserBasket from "../ui/page/UserBasket";
import UserOrders from "../ui/page/UserOrders";
import UserOrdersInfo from "../ui/page/UserOrdersInfo";
import AdminCatalog from "../ui/page/AdminCatalog";
import AdminAddProduct from "../ui/page/AdminAddProduct";
import AdminOrders from "../ui/page/AdminOrders";
import AdminOrdersInfo from "../ui/page/AdminOrdersInfo";
import AdminUsers from "../ui/page/AdminUsers";
import {useListener} from "../store/store";
//import {useSelector} from "react-redux";

const Router = () => {

    //const role = useSelector(state => state.role); редакс

    const role = useListener("role"); // мобикс

    const userRoutes = [
        {p : '/UserCatalog', e: <UserCatalog/>},
        {p : '/UserBasket', e: <UserBasket/>},
        {p : '/UserOrders', e: <UserOrders/>},
        {p : '/UserOrdersInfo', e: <UserOrdersInfo/>},
    ];

    const adminRoutes = [
        {p : '/AdminCatalog', e: <AdminCatalog/>},
        {p : '/AdminAddProduct', e: <AdminAddProduct/>},
        {p : '/AdminOrders', e: <AdminOrders/>},
        {p : '/AdminOrdersInfo', e: <AdminOrdersInfo/>},
        {p : '/AdminUsers', e: <AdminUsers/>},
    ];

    const commonRoutes = [
        {p : '/Authorization', e: <Authorization/>},
        {p : '/Registration', e: <Registration/>},
    ];

    const routes = role === "user" ? [...userRoutes, ...commonRoutes] :
        role === "admin" ? [...adminRoutes, ...commonRoutes] :
            commonRoutes;


    return ( //компонент
        <BrowserRouter>
            <Routes>
                {routes.map(route => <Route element= {route.e} path={route.p}/>)}
                <Route path={"/*"} element={<Authorization/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;