import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
import more from "../../img/more.png";
import Error from "../comp/error";
import Button from "../comp/button";
//import {useDispatch} from "react-redux";
import { Orders, StatusOrder } from "../../req/reqF";
import { useNavigate } from "react-router-dom";
import { Order } from "../../trans/order";
import { useDispatcher } from "../../store/store";

function AdminOrders() {

    const [error, setError] = useState("");

    const router = useNavigate();

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    const [ord, setOrd] = useState([])

    // мобикс
    const serOrderA = useDispatcher("orderA");

    const serIdProdA = useDispatcher("idProdA");

    /* редакс
    const dispatch = useDispatch();

    const serOrderA = (ord) => {
        dispatch({type: "setOrderA", payload: ord})
    }

    const serIdProdA = (id) => {
        dispatch({type: "setIdProdA", payload: id})
    }*/


    async function statusOrder() {
        if (valueInp.length !== 0) {
            for (let i = 0; i < valueInp.length; i++) {
                let order = {
                    id: valueInp[i]
                }
                const ord = new Order();
                ord.set(order);
                await StatusOrder(ord.get());
                listOrders();
            }
        }
        else {
            setError("Выберете заказ")
        }
    }

    async function listOrders() {
        let data = await Orders();
        let res = data.data_;
        let n = 0;
        let orders = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            orders.push({
                products: res[i].products, id: res[i].id, item: [{ name: n }, { name: res[i].id }, { name: res[i].totalPrice }, { name: res[i].createdAt.substring(0, 10) }, { name: res[i].status }, {
                    name: <a onClick={(event) => {
                        router("/AdminOrdersInfo");
                        const orderA = { prod: orders[i].products, }
                        serIdProdA(orders[i].id);
                        let t = 0;
                        let products = [];
                        for (let j = 0; j < orderA.prod.length; j++) {
                            t = t + 1;
                            products.push({ id: orderA.prod[j].id, item: [{ name: t }, { name: orderA.prod[j].name }, { name: orderA.prod[j].type }, { name: orderA.prod[j].price }, { name: orderA.prod[j].quantity }] })
                        }
                        serOrderA(products);
                        event.stopPropagation()
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
            <Menu role="admin" ></Menu>
            <Tabl tytles={[
                { id: 1, name: '№' },
                { id: 2, name: 'ID' },
                { id: 3, name: 'Цена' },
                { id: 4, name: 'Дата' },
                { id: 5, name: 'Статус' },
                { id: 6, name: '' }
            ]} items={ord} onChange={ValueInp} ></Tabl>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <Button text="Готово" func={() => { statusOrder(); }}></Button>
            </div>
        </>
    );
}

export default AdminOrders;