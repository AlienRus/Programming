import { useState } from "react";
import Menu from "../comp/menu";
import "../../css/fon.css"
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import Input from "../comp/input";
import { AddProduct } from "../../req/reqF";
import { Product } from "../../trans/product";

function PA2() {

    const [error, setError] = useState("");

    const [valueK, setValueK] = useState("");
    const handlerK = (e) => setValueK(e.target.value);

    const [valueN, setValueN] = useState("");
    const handlerN = (e) => setValueN(e.target.value);

    const [valueC, setValueC] = useState("");
    const handlerC = (e) => setValueC(e.target.value);

    async function addProduct() {
        if (valueK !== "" && valueN !== "" && valueC !== "") {

            const productV = {
                type: valueK,
                name: valueN,
                price: valueC
            }

            const user = new Product();
            user.set(productV);
            await AddProduct(user.get());

            setValueN("");
            setValueC("");
            setValueK("");
            setError("");

        }
        else {
            setError("Не все поля были заполнены")
        }
    }

    return (
        <>
            <Title title="Добавить товар"></Title>
            <Menu role="admin" ></Menu>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", marginTop: "5%" }}>
                <Input value={valueK} type='text' text="Категория" onChange={handlerK}></Input>
                <Input value={valueN} type='text' text="Название" onChange={handlerN} ></Input>
                <Input value={valueC} type='text' text="Цена" onChange={handlerC} ></Input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <Button text="Добавить" func={() => { addProduct() }}></Button>
            </div>
        </>
    );
}

export default PA2;