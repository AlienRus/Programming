import { useState } from "react";
import "../../css/fon.css";
import Title from "../comp/title";
import Input from "../comp/input";
import Button from "../comp/button";
import Error from "../comp/error";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../store/hooks/useRegistration";

function Registration() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [valueInp, setValueInp] = useState("");
  const handlerValue = (e) => setValueInp(e.target.value);

  const [valuePas, setValuePas] = useState("");
  const handlerPass = (e) => setValuePas(e.target.value);

  const [valuePasR, setValuePasR] = useState("");
  const handlerPassR = (e) => setValuePasR(e.target.value);

  const { userAlreadyExists, reg } = useRegistration();

  const Reg_ = () => {
    if (valueInp !== "" && valuePas !== "" && valuePasR !== "") {
      if (valuePas === valuePasR) {
        reg(valueInp, valuePas);
        if (userAlreadyExists) {
          setError("Пользователь уже существует");
        } else {
          navigate("/psi");
        }
      } else {
        setError("Пароли не совпадают");
      }
    } else {
      setError("Не все поля были заполнены");
    }
  };

  return (
    <>
      <Title title="Регистрация"></Title>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          marginTop: "5%",
        }}
      >
        <Input type="text" text="Логин" onChange={handlerValue}></Input>
        <Input type="password" text="Пароль" onChange={handlerPass}></Input>
        <Input
          type="password"
          text="Повторите пароль"
          onChange={handlerPassR}
        ></Input>
        <h5 style={{ margin: "auto", color: "#6696a2", fontFamily: "Arial" }}>
          <a
            onClick={() => {
              navigate("/Authorization");
            }}
          >
            Авторизация
          </a>
        </h5>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button
          func={() => {
            Reg_();
          }}
          text="Ок"
        ></Button>
      </div>
    </>
  );
}

export default Registration;
