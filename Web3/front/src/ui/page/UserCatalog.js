import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import plus from "../../img/plus.png";
import minus from "../../img/minus.png";
import { Products } from "../../trans/req/reqF";
//import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatcher, useListener } from "../../store/store";
import { WSocket, WSocketTm, closeWSTimer, createWSTimer } from "../../websocket/websocket";

let socket;

function UserCatalog() {

    const router = useNavigate()

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    const [res, setRes] = useState();

    const [valueCounts, setValueCounts] = useState([]);

    const [error, setError] = useState("")

    const [prod, setProd] = useState([]);

    // мобикс
    const Prod = useListener("Prod");

    const serProducts = useDispatcher("Prod");

    /* редакс
        const Prod = useSelector(state => state.Prod);
    
        const dispatch = useDispatch();
    
        const serProducts = (prod) => {
            dispatch({type: "setProducts", payload: prod})
        }
    
     */

    useEffect(() => {
        socket = new WebSocket('ws://localhost:8080/shopProject-1' + '/message');
        socket.onmessage = (event) => {
            alert(event.data)
        }
        return () => {
            socket.close();
        }
    }, [])

    function DataGet() {
        let n = 0;
        let products = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            products.push({
                id: res[i].id, item: [{ name: n }, { name: res[i].name }, { name: res[i].type }, { name: res[i].price }, {
                    name: <a onClick={(event) => {
                        setValueCounts(prevState => {
                            const temp = [];
                            for (let j = 0; j < prevState.length; j++) {
                                if (j === i) {
                                    temp.push(prevState[j] + 1)
                                } else {
                                    temp.push(prevState[j]);
                                }
                            }
                            return temp;
                        })
                        event.stopPropagation();
                    }
                    }><img src={plus}></img></a>
                }, {
                    name: <a onClick={(event) => {
                        setValueCounts(prevState => {
                            const temp = [];
                            for (let j = 0; j < prevState.length; j++) {
                                if (j === i && prevState[j] > 0) {
                                    temp.push(prevState[j] - 1)
                                } else {
                                    temp.push(prevState[j]);
                                }
                            }
                            return temp;
                        })
                        event.stopPropagation();
                    }
                    }><img src={minus}></img></a>
                }, { name: valueCounts[i] ?? 0 }]
            })
        }
        serProducts(products);
        return products;
    }


    async function listProducts() {
        let data = await Products();
        let res = data.data_;
        let mas = []
        for (let i = 0; i < res.length; i++) {
            mas.push(0)
        }
        setValueCounts(mas);
        setRes(res);
        WSocket(listProducts, "/asyncProducts")
    }


    useEffect(() => {
        if (res !== undefined) {
            setProd(DataGet());
        };
    }, [valueCounts, res]);
    useEffect(() => { listProducts(); return }, []);

    return (
        <>
            <Title title="Список товаров"></Title>
            <Menu role="user" ></Menu>
            <Tabl tytles={[
                { id: 1, name: '№' },
                { id: 2, name: 'Название' },
                { id: 3, name: 'Категория' },
                { id: 4, name: 'Цена' },
                { id: 5, name: '' },
                { id: 6, name: '' },
                { id: 7, name: 'Кол-во' },
            ]} items={prod} onChange={ValueInp} ></Tabl>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <Button text="Добавить в корзину" func={() => {
                    let c = 0;
                    for (let i = 0; i < Prod.length; i++) {
                        if (Prod[i].item[6].name !== 0) {
                            c += 1;
                        }
                    }
                    if (c === 0) {
                        setError("Выберите товары")
                    }
                    else {
                        router('/UserBasket')
                    }
                }}></Button>
            </div>
        </>
    );
}

export default UserCatalog;
