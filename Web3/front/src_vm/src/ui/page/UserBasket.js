import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import del from "../../img/delete.png";
//import {useSelector} from "react-redux";
import { useUserBasket } from "../../store/viewmodel";

function UserBasket() {
  const [error, setError] = useState("");

  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const { prodd, sum, handleAddingOrder, handleDelete } =
    useUserBasket();

  const addOrder = async () => {
    if (!prodd) return;
    if (sum !== 0) {
      const successfulOrder = await handleAddingOrder();
      if (successfulOrder) {
        alert("Заказ успешно оформлен");
      } else {
        setError("Возникли технические неполадки");
      }
    } else {
      setError("Корзина пуста");
    }
  };

  const items = prodd.map((product) => {
    const item = product.item.map((item) =>
      item.name === "PLACEHOLDER" ? (
        <a
          key={item.id}
          
        >
          <img src={del} alt="Delete"></img>
        </a>
      ) : (
        item
      )
    );
    return { ...product, item };
  });

  return (
    <>
      <Title title="Корзина"></Title>
      <Menu role="user"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "Название" },
          { id: 2, name: "Категория" },
          { id: 3, name: "Цена" },
          { id: 4, name: "Кол-во" },
          { id: 5, name: "" },
        ]}
        items={items}
        onChange={ValueInp}
      ></Tabl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <h5
          style={{ margin: "20px auto", color: "#6696a2", fontFamily: "Arial" }}
        >
          {" "}
          Общая цена {sum}
        </h5>
        <Button text="Оформить" func={() => addOrder()}></Button>
      </div>
    </>
  );
}

export default UserBasket;
