import { useEffect, useState } from "react";
import { useDispatcher } from "../store";
import { Orders, StatusOrder } from "../../trans/req/reqF";
import { Order } from "../../trans/order";

// AdminOrders 
export function useAdminOrders() {
    const [orders, setOrders] = useState([]);
    const setIdProdA = useDispatcher("idProdA");
    const setOrderA = useDispatcher("orderA");

    /* редакс
      const dispatch = useDispatch();
  
      const setIdProdA = (id) => {
          dispatch({type: "setIdProdA", payload: id})
          const setOrderA = (ord) => {
            dispatch({type: "setOrderA", payload: ord})
          }
        }*/


    const listOrders = async () => {
        let data = await Orders();
        let res = data.data_;
        let n = 0;
        let orders = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            orders.push({
                products: res[i].products,
                id: res[i].id,
                item: [
                    { name: n },
                    { name: res[i].id },
                    { name: res[i].totalPrice },
                    { name: res[i].createdAt.substring(0, 10) },
                    { name: res[i].status },
                    { name: "PLACEHOLDER" }
                ],
            });
        }
        setOrders(orders);
    };

    const handleInfoClick = (i) => {
        const orderA = { prod: orders[i].products };
        setIdProdA(orders[i].id);
        let t = 0;
        let products = [];
        for (let j = 0; j < orderA.prod.length; j++) {
            t = t + 1;
            products.push({
                id: orderA.prod[j].id,
                item: [
                    { name: t },
                    { name: orderA.prod[j].name },
                    { name: orderA.prod[j].type },
                    { name: orderA.prod[j].price },
                    { name: orderA.prod[j].quantity },
                ],
            });
        }
        setOrderA(products);
    }

    const statOrder = async (valueInp) => {
        for (let i = 0; i < valueInp.length; i++) {
            const ord = new Order();
            ord.set({ id: valueInp[i] });
            await StatusOrder(ord.get());
            await listOrders();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await listOrders();
        };
        fetchData();
    }, []);

    return {
        orders,
        listOrders,
        statOrder,
        handleInfoClick,
    };
}