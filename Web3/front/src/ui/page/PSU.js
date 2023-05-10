import { useState } from "react";
import "../../css/fon.css"
import Title from "../comp/title";
import Input from "../comp/input";
import Button from "../comp/button";
import Error from "../comp/error";
import { useNavigate } from "react-router-dom";
import { User } from "../../trans/user";
import { Reg } from "../../req/reqF";

function PSU() {

    const [error, setError] = useState("");

    const router = useNavigate();

    const [valueInp, setValueInp] = useState("");
    const handlerValue = (e) => setValueInp(e.target.value);

    const [valuePas, setValuePas] = useState("");
    const handlerPass = (e) => setValuePas(e.target.value);

    const [valuePasR, setValuePasR] = useState("");
    const handlerPassR = (e) => setValuePasR(e.target.value);

    async function Reg_() {
        if (valueInp !== "" && valuePas !== "" && valuePasR !== "") {
            if (valuePas === valuePasR) {
                const userV = {
                    login: valueInp,
                    password: valuePas
                }

                const user = new User();
                user.set(userV);
                const data = await Reg(user.get());

                if (data.status === 200) {
                    router('/psi')

                } else {
                    setError("Пользователь уже существует")
                }
            }
            else {
                setError("Пароли не совпадают")
            }
        }
        else {
            setError("Не все поля были заполнены")
        }
    }


    return (
        <>
            <Title title="Регистрация"></Title>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", marginTop: "5%" }}>
                <Input type='text' text="Логин" onChange={handlerValue}></Input>
                <Input type='password' text="Пароль" onChange={handlerPass} ></Input>
                <Input type='password' text="Повторите пароль" onChange={handlerPassR} ></Input>
                <h5 style={{ margin: "auto", color: "#6696a2", fontFamily: "Arial" }}><a onClick={() => { router("/psi") }}>Авторизация</a></h5>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <Button func={() => { Reg_() }} text='Ок'></Button>
            </div>
        </>
    );
}

export default PSU;