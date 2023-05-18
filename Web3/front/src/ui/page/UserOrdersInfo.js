import { useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import { useOrdersInfo } from "../../store/hooks/useOrdersInfo";

function UserOrdersInfo() {
  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const { orderU, idProdU } = useOrdersInfo();

  return (
    <>
      <Title title={"Заказ с ID " + String(idProdU)}></Title>
      <Menu role="user"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "№" },
          { id: 2, name: "Название" },
          { id: 3, name: "Категория" },
          { id: 4, name: "Цена" },
          { id: 5, name: "Кол-во" },
        ]}
        items={orderU}
        onChange={ValueInp}
      ></Tabl>
    </>
  );
}

export default UserOrdersInfo;
