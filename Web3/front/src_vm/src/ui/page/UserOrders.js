import { useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import more from "../../img/more.png";
import { useNavigate } from "react-router-dom";
//import {useDispatch} from "react-redux";
import { useUserOrders } from "../../store/viewmodel";

function UserOrders() {
  const router = useNavigate();

  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const { orders, onClickInfo } = useUserOrders();

  return (
    <>
      <Title title="Заказы"></Title>
      <Menu role="user"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "№" },
          { id: 2, name: "ID" },
          { id: 3, name: "Цена" },
          { id: 4, name: "Дата" },
          { id: 5, name: "Статус" },
          { id: 6, name: "" },
        ]}
        items={orders.map((order, index) => ({
          ...order,
          item: [
            order.item[0], // №
            order.item[1], // ID
            order.item[2], // Цена
            order.item[3], // Дата
            order.item[4], // Статус
            {
              name: (
                <a
                  onClick={(event) => {
                    router("/UserOrdersInfo");
                    onClickInfo(order);
                    event.stopPropagation();
                  }}
                >
                  <img src={more} alt="More"></img>
                </a>
              ),
            },
          ],
        }))}
        onChange={ValueInp}
      ></Tabl>
    </>
  );
}

export default UserOrders;
