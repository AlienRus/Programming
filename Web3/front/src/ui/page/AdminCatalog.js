import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import { useAdminCatalog } from "../../store/hooks/useAdminCatalog";

function AdminCatalog() {
  const [error, setError] = useState("");

  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const { products, handleProductsDelete } = useAdminCatalog();

  const delProducts = () => {
    if (valueInp.length === 0) {
      setError("Ничего не выбрано");
    } else {
      handleProductsDelete(valueInp);
      setError("");
      setValueInp((prevState) => {
        prevState.length = 0;
        return [prevState];
      });
    }
  };

  return (
    <>
      <Title title="Список товаров"></Title>
      <Menu role="admin"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "№" },
          { id: 2, name: "Название" },
          { id: 3, name: "Категория" },
          { id: 4, name: "Цена" },
        ]}
        items={products}
        onChange={ValueInp}
      ></Tabl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button
          text="Удалить"
          func={() => {
            delProducts();
          }}
        ></Button>
      </div>
    </>
  );
}

export default AdminCatalog;
