import { useEffect, useState } from "react";
import { useDispatcher } from "../store";
import { OrdersUser } from "../../trans/req/reqF";

// UserOrders begin
export function useUserOrders() {
    const [orders, setOrders] = useState([]);

    // мобикс
    const setOrderU = useDispatcher("orderU");

    const setIdProdU = useDispatcher("idProdU");

    /* редакс
      const dispatch = useDispatch();
  
      const setOrderU = (ord) => {
          dispatch({type: "setOrderU", payload: ord})
      }
  
      const setIdProdU = (id) => {
          dispatch({type: "setIdProdU", payload: id})
      }
  
       */

    const listOrders = async () => {
        let data = await OrdersUser();
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
                    res[i].id, 
                ],
            });
        }
        setOrders(orders);
    };

    const onClickInfo = (order) => {
        const orderU = { prod: order.products };
        const orderId = order.item[5]; // ID
        setIdProdU(orderId);
        let t = 0;
        let products = [];
        for (let j = 0; j < orderU.prod.length; j++) {
            t = t + 1;
            products.push({
                id: orderU.prod[j].id,
                item: [
                    { name: t },
                    { name: orderU.prod[j].name },
                    { name: orderU.prod[j].type },
                    { name: orderU.prod[j].price },
                    { name: orderU.prod[j].quantity },
                ],
            });
        }
        setOrderU(products);
    };

    useEffect(() => {
        const fetchData = async () => {
            await listOrders();
        };
        fetchData();
    }, []);

    return { orders, onClickInfo };
}