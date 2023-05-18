import { useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import plus from "../../img/plus.png";
import minus from "../../img/minus.png";
import { useNavigate } from "react-router-dom";
import { useUserCatalog } from "../../store/hooks/useUserCatalog";

function UserCatalog() {
  const navigate = useNavigate();

  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const [error, setError] = useState("");

  const { prod, Prod, onClickMinus, onClickPlus } = useUserCatalog();

  return (
    <>
      <Title title="Список товаров"></Title>
      <Menu role="user"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "№" },
          { id: 2, name: "Название" },
          { id: 3, name: "Категория" },
          { id: 4, name: "Цена" },
          { id: 5, name: "" },
          { id: 6, name: "" },
          { id: 7, name: "Кол-во" },
        ]}
        items={prod.map((product, index) => ({
          ...product,
          item: [
            product.item[0], // №
            product.item[1], // Название
            product.item[2], // Категория
            product.item[3], // Цена
            {
              name: (
                <a
                  onClick={(event) => {
                    onClickMinus(index);
                    event.stopPropagation();
                  }}
                >
                  <img src={plus} alt="Plus"></img>
                </a>
              ),
            },
            {
              name: (
                <a
                  onClick={(event) => {
                    onClickPlus(index);
                    event.stopPropagation();
                  }}
                >
                  <img src={minus} alt="Minus"></img>
                </a>
              ),
            },
            product.item[4], // Кол-во
          ],
        }))}
        onChange={ValueInp}
      ></Tabl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button
          text="Добавить в корзину"
          func={() => {
            let c = 0;
            for (let i = 0; i < Prod.length; i++) {
              if (Prod[i].item[4].name !== 0) {
                c += 1;
              }
            }
            if (c === 0) {
              setError("Выберите товары");
            } else {
              navigate("/UserBasket");
            }
          }}
        ></Button>
      </div>
    </>
  );
}

export default UserCatalog;
