import { useEffect, useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
import Button from "../comp/button";
import Error from "../comp/error";
import del from "../../img/delete.png";
import { DeleteUser, StatusUser, Userss } from "../../req/reqF";
import { User } from "../../trans/user";
import { WSocket } from "../../websocket/websocket";

function PA5() {

    const [error, setError] = useState("");

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    const [userss, setUsers] = useState([]);

    async function listUsers() {
        let data = await Userss();
        let res = data.data_;
        let n = 0;
        let users = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            users.push({
                id: res[i].id, item: [{ name: n }, { name: res[i].id }, { name: res[i].login }, { name: res[i].role }, {
                    name: <a onClick={(event) => {
                        setUsers((prevState) => {
                            DeleteUser([{ "id": users[i].id }])
                            return prevState.filter((index) => index.id !== users[i].id)
                        }
                        ); event.stopPropagation()
                    }}><img src={del}></img></a>
                }]
            })
        }
        setUsers(users);
        WSocket(listUsers, "/asyncUsers")
    }

    async function statusUser() {
        if (valueInp.length !== 0) {
            for (let i = 0; i < valueInp.length; i++) {
                let user = {
                    id: valueInp[i]
                }
                const us = new User();
                us.set(user);
                await StatusUser(us.get());
                listUsers();
            }
        }
        else {
            setError("Выберете пользователя")
        }
    }

    useEffect(() => { listUsers(); return }, []);

    return (
        <>
            <Title title="Список пользователей"></Title>
            <Menu role="admin" ></Menu>
            <Tabl tytles={[
                { id: 1, name: '№' },
                { id: 2, name: 'ID' },
                { id: 3, name: 'Логин' },
                { id: 4, name: 'Роль' },
                { id: 5, name: '' }
            ]} items={userss} onChange={ValueInp} ></Tabl>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Error text={error}></Error>
                <Button text="Изменить роль" func={() => statusUser()}></Button>
            </div>
        </>
    );
}

export default PA5;