import { useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import Error from "../comp/error";
import Button from "../comp/button";
import { useAdminOrders } from "../../store/hooks/useAdminOrders";

function AdminOrders() {
  const [error, setError] = useState("");

  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const { orders, statOrder } = useAdminOrders();

  const statusOrder = () => {
    if (valueInp.length !== 0) {
      statOrder(valueInp);
    } else {
      setError("Выберете заказ");
    }
  };

  return (
    <>
      <Title title="Заказы"></Title>
      <Menu role="admin"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "№" },
          { id: 2, name: "ID" },
          { id: 3, name: "Цена" },
          { id: 4, name: "Дата" },
          { id: 5, name: "Статус" },
          { id: 6, name: "" },
        ]}
        items={orders}
        onChange={ValueInp}
      ></Tabl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button
          text="Готово"
          func={() => {
            statusOrder();
          }}
        ></Button>
      </div>
    </>
  );
}

export default AdminOrders;
