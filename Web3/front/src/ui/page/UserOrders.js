import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
import more from "../../img/more.png"
import { OrdersUser } from "../../req/reqF";
import { useNavigate } from "react-router-dom";
//import {useDispatch} from "react-redux";
import { useDispatcher } from "../../store/store";

function UserOrders() {

    const router = useNavigate();

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    const [ord, setOrd] = useState([])

    // мобикс
    const serOrderU = useDispatcher("orderU");

    const serIdProdU = useDispatcher("idProdU");

    /* редакс
    const dispatch = useDispatch();

    const serOrderU = (ord) => {
        dispatch({type: "setOrderU", payload: ord})
    }

    const serIdProdU = (id) => {
        dispatch({type: "setIdProdU", payload: id})
    }

     */

    async function listOrders() {
        let data = await OrdersUser();
        let res = data.data_;
        let n = 0;
        let orders = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            orders.push({
                products: res[i].products, id: res[i].id, item: [{ name: n }, { name: res[i].id }, { name: res[i].totalPrice }, { name: res[i].createdAt.substring(0, 10) }, { name: res[i].status }, {
                    name: <a onClick={(event) => {
                        router("/UserOrdersInfo");
                        const orderU = { prod: orders[i].products, }
                        serIdProdU(orders[i].id);
                        let t = 0;
                        let products = [];
                        for (let j = 0; j < orderU.prod.length; j++) {
                            t = t + 1;
                            products.push({ id: orderU.prod[j].id, item: [{ name: t }, { name: orderU.prod[j].name }, { name: orderU.prod[j].type }, { name: orderU.prod[j].price }, { name: orderU.prod[j].quantity }] })
                        }
                        serOrderU(products); event.stopPropagation()
                    }}><img src={more}></img></a>
                }]
            })
        }
        setOrd(orders);
    }


    useEffect(() => { listOrders(); return }, []);


    return (
        <>
            <Title title="Заказы"></Title>
            <Menu role="user" ></Menu>
            <Tabl tytles={[
                { id: 1, name: '№' },
                { id: 2, name: 'ID' },
                { id: 3, name: 'Цена' },
                { id: 4, name: 'Дата' },
                { id: 5, name: 'Статус' },
                { id: 6, name: '' }
            ]} items={ord} onChange={ValueInp} ></Tabl>
        </>
    );
}

export default UserOrders;