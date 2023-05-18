import { useEffect, useState } from "react";
import { Order } from "../../trans/order";
import { useListenerProd } from "../store";
import { AddOrder } from "../../trans/req/reqF";

import React from "react";
import del from "../../img/delete.png";

// UserBasket 
export function useUserBasket() {
    const Prod = useListenerProd();

    // const Prod = useListener("Prod");
    // const Prod = useSelector(state => state.Prod); редакс

    const [prodd, setProdd] = useState(Prod);
    const [sum, setSUM] = useState(0);

    const calcSum = (prodd) => {
        if (!prodd) return;
        let a = 0;
        for (let i = 0; i < prodd.length; i++) {
            a += prodd[i].item[2].name * prodd[i].item[3].name;
        }
        setSUM(a);
    };

    const handleAddingOrder = async () => {
        if (!prodd) return;
        let order = { products: [] };
        for (let i = 0; i < prodd.length; i++) {
            order.products.push({
                id: prodd[i].id,
                quantity: prodd[i].item[3].name,
            });
        }
        order.totalPrice = sum;
        const ord = new Order();
        ord.set(order);
        const resp = await AddOrder(ord.get());
        if (resp.status === 200) {
            setProdd([]);
            setSUM(0);
            return true;
        } else {
            return false;
        }
    };

    const listProducts = () => {
        if (!prodd) return;
        let products = [];
        for (let i = 0; i < prodd.length; i++) {
            if (prodd[i].item[4].name !== 0) {
                products.push({
                    id: prodd[i].id,
                    item: [
                        { name: prodd[i].item[1].name },
                        { name: prodd[i].item[2].name },
                        { name: prodd[i].item[3].name },
                        { name: prodd[i].item[4].name },
                        {
                            name: (
                                <a
                                    onClick={(event) => {
                                        setProdd((prevState) => {
                                            calcSum(
                                                prevState.filter((index) => index.id !== prodd[i].id)
                                            );
                                            return prevState.filter(
                                                (index) => index.id !== prodd[i].id
                                            );
                                        });
                                        event.stopPropagation();
                                    }}
                                >
                                    <img src={del}></img>
                                </a>
                            ),
                        },
                    ],
                });
            }
        }
        setProdd(products);
        calcSum(products);
    };

    const handleDelete = (product) => {
        setProdd((prevState) => {
            calcSum(prevState.filter((index) => index.id !== product.id));
            return prevState.filter((index) => index.id !== product.id);
        });
    };

    useEffect(() => {
        setProdd(Prod);
        listProducts();
        return;
    }, []);

    return {
        prodd,
        sum,
        calcSum,
        handleAddingOrder,
        listProducts,
        handleDelete,
    };
}