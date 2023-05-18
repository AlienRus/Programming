import { useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css";
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import del from "../../img/delete.png"


import { useAdminUsers } from "../../store/hooks/useAdminUsers";

function AdminUsers() {
  const [error, setError] = useState("");

  const [valueInp, setValueInp] = useState([]);
  const ValueInp = (valueInp) => {
    setValueInp(valueInp);
  };

  const { users, statusUser, handleDeleteClick } = useAdminUsers();

  const statUser = () => {
    if (valueInp.length !== 0) {
      statusUser(valueInp);
    } else {
      setError("Выберете пользователя");
    }
  };


  return (
    <>
      <Title title="Список пользователей"></Title>
      <Menu role="admin"></Menu>
      <Tabl
        tytles={[
          { id: 1, name: "№" },
          { id: 2, name: "ID" },
          { id: 3, name: "Логин" },
          { id: 4, name: "Роль" },
          { id: 5, name: "" },
        ]}
        items={users.map((user, index) => ({
          ...user,
          item: user.item.map((item) =>
            item.name === "PLACEHOLDER" ? { name: (
              <a
                onClick={(event) => {
                  handleDeleteClick(index);
                  event.stopPropagation();
                }}
              >
                <img src={del} alt="Delete"></img>
              </a>
            ) } : (
              item
            )
          ),
        }))}
        onChange={ValueInp}
      ></Tabl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Error text={error}></Error>
        <Button text="Изменить роль" func={() => statUser()}></Button>
      </div>
    </>
  );
}

export default AdminUsers;
