import { Products } from "../../trans/req/reqF";
import { WSocket, WSocketV2 } from "../../trans/websocket/websocket";
import { useEffect, useState } from "react";
import { useDispatcher, useListener } from "../store";

// UserCatalog begin
export function useUserCatalog() {
    const [res, setRes] = useState();

    const [valueCounts, setValueCounts] = useState([]);

    const [prod, setProd] = useState([]);

    // мобикс
    const Prod = useListener("Prod");

    const setProducts = useDispatcher("Prod");

    /* редакс
          const Prod = useSelector(state => state.Prod);
      
          const dispatch = useDispatch();
      
          const setProducts = (prod) => {
              dispatch({type: "setProducts", payload: prod})
          }
      
    */

    useEffect(() => {
        let manager = WSocketV2;
        manager.start(alert, "/message");
        return () => manager.stop();
    }, []);

    const dataGet = () => {
        let n = 0;
        let products = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            products.push({
                id: res[i].id,
                item: [
                    { name: n },
                    { name: res[i].name },
                    { name: res[i].type },
                    { name: res[i].price },
                    { name: valueCounts[i] ?? 0 },
                ],
            });
        }
        setProducts(products);
        return products;
    };

    const listProducts = async () => {
        let data = await Products();
        let res = data.data_;
        let mas = [];
        for (let i = 0; i < res.length; i++) {
            mas.push(0);
        }
        setValueCounts(mas);
        setRes(res);
        WSocket(listProducts, "/asyncProducts");
    };

    const onClickMinus = (index) => {
        setValueCounts((prevState) => {
            const temp = [];
            for (let j = 0; j < prevState.length; j++) {
                if (j === index) {
                    temp.push(prevState[j] + 1);
                } else {
                    temp.push(prevState[j]);
                }
            }
            return temp;
        });
    };

    const onClickPlus = (index) => {
        setValueCounts((prevState) => {
            const temp = [];
            for (let j = 0; j < prevState.length; j++) {
                if (j === index && prevState[j] > 0) {
                    temp.push(prevState[j] - 1);
                } else {
                    temp.push(prevState[j]);
                }
            }
            return temp;
        });
    };

    useEffect(() => {
        if (res !== undefined) {
            setProd(dataGet());
        }
    }, [valueCounts, res]);

    useEffect(() => {
        const fetchData = async () => {
            await listProducts();
        };
        fetchData();
    }, []);

    return { prod, Prod, onClickMinus, onClickPlus };
}