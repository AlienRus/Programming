import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import { DeleteProduct, Products } from "../../req/reqF";
import { WSocket } from "../../websocket/websocket";

function PA1() {

    const [error, setError] = useState("")

    const [prod, setProd] = useState([]);

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    async function listProducts() {
        let data = await Products();
        let res = data.data_;
        let n = 0;
        let products = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            products.push({ id: res[i].id, item: [{ name: n }, { name: res[i].name }, { name: res[i].type }, { name: res[i].price }] })
        }
        setProd(products);
        WSocket(listProducts, "/asyncProducts")
    }

    async function Delete() {
        if (valueInp.length === 0) {
            setError("Ничего не выбрано");
        }
        else {
            let id = []
            for (let i = 0; i < valueInp.length; i++) {
                id.push({ "id": valueInp[i] })
            }
            await DeleteProduct(id);

            listProducts();
            setError("");
            setValueInp((prevState) => {
                prevState.length = 0;
                return [prevState];
            })
        }
    }

    useEffect(() => { listProducts(); return }, []);

    return (
        <>
            <Title title="Список товаров"></Title>
            <Menu role="admin" ></Menu>
            <Tabl tytles={[
                { id: 1, name: '№' },
                { id: 2, name: 'Название' },
                { id: 3, name: 'Категория' },
                { id: 4, name: 'Цена' }
            ]} items={prod} onChange={ValueInp} ></Tabl>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <Button text="Удалить" func={() => { Delete() }}></Button>
            </div>
        </>
    );
}

export default PA1;