import { useState } from "react";
import Menu from "../comp/menu";
import "../../css/fon.css";
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import Input from "../comp/input";
import { useAdminProductAdding } from "../../store/viewmodel";

function AdminAddProduct() {
  const [error, setError] = useState("");

  const [type, setType] = useState("");
  const handlerType = (e) => setType(e.target.value);

  const [name, setName] = useState("");
  const handlerName = (e) => setName(e.target.value);

  const [price, setPrice] = useState("");
  const handlerPrice = (e) => setPrice(e.target.value);

  const { handleProductAdding } = useAdminProductAdding();

  const resetState = () => {
    setName("");
    setPrice("");
    setType("");
    setError("");
  };

  const addProduct = () => {
    if (type !== "" && name !== "" && price !== "") {
      handleProductAdding(type, name, price);
      resetState();
    } else {
      setError("Не все поля были заполнены");
    }
  };

  return (
    <>
      <Title title="Добавить товар"></Title>
      <Menu role="admin"></Menu>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          marginTop: "5%",
        }}
      >
        <Input
          value={type}
          type="text"
          text="Категория"
          onChange={handlerType}
        ></Input>
        <Input
          value={name}
          type="text"
          text="Название"
          onChange={handlerName}
        ></Input>
        <Input
          value={price}
          type="text"
          text="Цена"
          onChange={handlerPrice}
        ></Input>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button
          text="Добавить"
          func={() => {
            addProduct();
          }}
        ></Button>
      </div>
    </>
  );
}

export default AdminAddProduct;
