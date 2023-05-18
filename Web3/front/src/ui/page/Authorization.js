import { useState } from "react";
import "../../css/fon.css";
import Title from "../comp/title";
import Input from "../comp/input";
import Button from "../comp/button";
import Error from "../comp/error";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../store/hooks/useAuthorization";

function Authorization() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [valueInp, setValueInp] = useState("");
  const handlerValue = (e) => setValueInp(e.target.value);

  const [valuePas, setValuePas] = useState("");
  const handlerPass = (e) => setValuePas(e.target.value);

  const { auth, setRoleAdmin, setRoleUser } =
    useAuthorization();

  const navigatePath = (role) => {
    switch (role) {
      case "user":
        setRoleUser("user");
        return "/UserCatalog";
      case "admin":
        setRoleAdmin("admin");
        return "/AdminCatalog";
      default:
        return "/";
    }
  };

  const Auth_ = async () => {
    if (valueInp !== "" && valuePas !== "") {
      const { result, role } = await auth(valueInp, valuePas);
      if (result === true) {
        setError("Пользователь не найден");
      } else {        
        navigate(navigatePath(role));
      }
    } else {
      setError("Не все поля были заполнены");
    }
  };

  return (
    <>
      <Title title="Авторизaция"></Title>
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
        <h5 style={{ margin: "auto", color: "#6696a2", fontFamily: "Arial" }}>
          <a
            onClick={() => {
              navigate("/Registration");
            }}
          >
            Регистрация
          </a>
        </h5>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button
          func={() => {
            Auth_();
          }}
          text="Войти"
        ></Button>
      </div>
    </>
  );
}

export default Authorization;
