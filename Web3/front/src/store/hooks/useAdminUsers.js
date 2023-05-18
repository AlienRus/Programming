import { WSocket } from "../../trans/websocket/websocket";
import { useEffect, useState } from "react";
import { DeleteUser, StatusUser, Userss } from "../../trans/req/reqF";
import { User } from "../../trans/user";

import React from "react";
import del from "../../img/delete.png";

// AdminUsers 
export function useAdminUsers() {
    const [users, setUsers] = useState([]);

    const listUsers = async () => {
        let data = await Userss();
        let res = data.data_;
        let n = 0;
        let users = [];
        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            users.push({
                id: res[i].id,
                item: [
                    { name: n },
                    { name: res[i].id },
                    { name: res[i].login },
                    { name: res[i].role },
                    {
                        name: (
                            <a
                                onClick={(event) => {
                                    setUsers((prevState) => {
                                        DeleteUser([{ id: users[i].id }]);
                                        return prevState.filter(
                                            (index) => index.id !== users[i].id
                                        );
                                    });
                                    event.stopPropagation();
                                }}
                            >
                                <img src={del}></img>
                            </a>
                        ),
                    },
                ],
            });
        }
        setUsers(users);
        WSocket(listUsers, "/asyncUsers");
    };

    const statusUser = async (valueInp) => {
        for (let i = 0; i < valueInp.length; i++) {
            const user = new User();
            user.set({ id: valueInp[i] });
            await StatusUser(user.get());
            await listUsers();
        }
    };

    const handleUserClick = async (user) => {
        setUsers((prevState) => {
            DeleteUser([{ id: user.id }]);
            return prevState.filter((index) => index.id !== user.id);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            await listUsers();
        };
        fetchData();
    }, []);

    return {
        users,
        listUsers,
        statusUser,
        handleUserClick,
    };
}