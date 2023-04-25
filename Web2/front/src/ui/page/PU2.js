import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import del from "../../img/delete.png"
//import {useSelector} from "react-redux";
import { AddOrder } from "../../req/reqF";
import { Order } from "../../trans/order";
import { useListenerProd } from "../../store/store";

function PU2() {

    const [error, setError] = useState("");

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    // мобикс
    const Prod = useListenerProd();

    //const Prod = useSelector(state => state.Prod); редакс

    const [prodd, setProdd] = useState(Prod);

    const [sum, setSUM] = useState(0);


    function Sum(prodd) {
        if (!prodd) return
        let a = 0;
        for (let i = 0; i < prodd.length; i++) {
            a += prodd[i].item[2].name * prodd[i].item[3].name
        }
        setSUM(a);
    }


    async function addOrder() {
        if (!prodd) return
        if (sum !== 0) {
            let order =
                { products: [] };
            for (let i = 0; i < prodd.length; i++) {
                order.products.push({
                    "id": prodd[i].id,
                    "quantity": prodd[i].item[3].name
                })
            }
            order.totalPrice = sum;
            const ord = new Order();
            ord.set(order)
            const resp = await AddOrder(ord.get());
            if (resp.status === 200) {
                alert('Заказ успешно оформлен');
                setProdd([]);
                setSUM(0)
            }
            else {
                setError('Возникли технические неполадки')
            }
        }
        else {
            setError("Корзина пуста")
        }
    }


    function listProducts() {
        if (!prodd) return
        let products = [];
        for (let i = 0; i < prodd.length; i++) {
            if (prodd[i].item[6].name !== 0) {
                products.push({
                    id: prodd[i].id, item: [{ name: prodd[i].item[1].name }, { name: prodd[i].item[2].name }, { name: prodd[i].item[3].name }, { name: prodd[i].item[6].name }, {
                        name: <a onClick={(event) => {
                            setProdd((prevState) => {
                                Sum(prevState.filter((index) => index.id !== prodd[i].id));
                                return prevState.filter((index) => index.id !== prodd[i].id)
                            }
                            ); event.stopPropagation()
                        }}><img src={del}></img></a>
                    }]
                })
            }
        }
        setProdd(products);
        Sum(products);
    }


    useEffect(() => { setProdd(Prod); listProducts(); return }, [Prod]);


    return (
        <>
            <Title title="Корзина"></Title>
            <Menu role="user" ></Menu>
            <Tabl tytles={[
                { id: 1, name: 'Название' },
                { id: 2, name: 'Категория' },
                { id: 3, name: 'Цена' },
                { id: 4, name: 'Кол-во' },
                { id: 5, name: '' }
            ]} items={prodd ?? []} onChange={ValueInp} ></Tabl>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <h5 style={{ margin: "20px auto", color: "#6696a2", fontFamily: "Arial" }}> Общая цена {sum}</h5>
                <Button text="Оформить" func={() => addOrder()}></Button>
            </div>
        </>
    );
}

export default PU2;