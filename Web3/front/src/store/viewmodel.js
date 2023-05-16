import { AddProduct, Auth } from "../trans/req/reqF";
import { Product } from "../trans/product";

import { DeleteProduct, Products } from "../trans/req/reqF";
import { WSocket } from "../websocket/websocket";
import { useEffect, useState } from "react";
import { useDispatcher } from "./store";
import { Orders, StatusOrder } from "../trans/req/reqF";
import { Order } from "../trans/order";
import { DeleteUser, StatusUser, Userss } from "../trans/req/reqF";
import { User } from "../trans/user";
import { Reg } from "../trans/req/reqF";
import { useListenerProd } from "./store";
import { AddOrder } from "../trans/req/reqF";
import { OrdersUser } from "../trans/req/reqF";
import { useListener } from "./store";

import React from "react";
import del from "../img/delete.png";
import more from "../img/more.png";
import { useNavigate } from "react-router-dom";

// AdminAddProduct begin
function useAdminProductAdding() {
  const handleProductAdding = async (type, name, price) => {
    if (type !== "" && name !== "" && price !== "") {
      const product = new Product();
      product.set({ type, name, price });
      await AddProduct(product.get());
    }
  };

  return {
    handleProductAdding,
  };
}
// AdminAddProduct end //
// *********************************************

// AdminCatalog begin
function useAdminCatalog() {
  const [products, setProducts] = useState([]);

  const listProducts = async () => {
    let data = await Products();
    let res = data.data_;
    let n = 0;
    let products = [];
    for (let i = 0; i < res.length; i++) {
      n = n + 1;
      products.push({
        id: res[i].id,
        item: [
          { name: n },
          { name: res[i].name },
          { name: res[i].type },
          { name: res[i].price },
        ],
      });
    }
    setProducts(products);
    WSocket(listProducts, "/asyncProducts");
  };

  const handleProductsDelete = async (valueInp) => {
    let id = [];
    for (let i = 0; i < valueInp.length; i++) {
      id.push({ id: valueInp[i] });
    }
    await DeleteProduct(id);
    await listProducts();
  };

  useEffect(() => {
    const fetchData = async () => {
      await listProducts();
    };
    fetchData();
  }, []);

  return {
    products,
    listProducts,
    handleProductsDelete,
  };
}
// AdminCatalog end //
// *********************************************

// AdminOrders begin
function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const setIdProdA = useDispatcher("idProdA");
  const setOrderA = useDispatcher("orderA");

  /* редакс
    const dispatch = useDispatch();

    const setIdProdA = (id) => {
        dispatch({type: "setIdProdA", payload: id})
        const setOrderA = (ord) => {
          dispatch({type: "setOrderA", payload: ord})
        }
      }*/

  const router = useNavigate();

  const listOrders = async () => {
    let data = await Orders();
    let res = data.data_;
    let n = 0;
    let orders = [];
    for (let i = 0; i < res.length; i++) {
      n = n + 1;
      orders.push({
        products: res[i].products, id: res[i].id, item: [
          { name: n },
          { name: res[i].id },
          { name: res[i].totalPrice },
          { name: res[i].createdAt.substring(0, 10) },
          { name: res[i].status },
          {
            name: <a onClick={(event) => {
              router("/AdminOrdersInfo");
              const orderA = { prod: orders[i].products, }
              setIdProdA(orders[i].id);
              let t = 0;
              let products = [];
              for (let j = 0; j < orderA.prod.length; j++) {
                t = t + 1;
                products.push({ id: orderA.prod[j].id, item: [{ name: t }, { name: orderA.prod[j].name }, { name: orderA.prod[j].type }, { name: orderA.prod[j].price }, { name: orderA.prod[j].quantity }] })
              }
              setOrderA(products);
              event.stopPropagation()
            }}><img src={more}></img></a>
          }]
      })
    }
    setOrders(orders);
  };

  const handleOrderClick = (order) => {
    const orderA = { prod: order.products };
    setIdProdA(order.id);
    let t = 0;
    let products = [];
    for (let j = 0; j < orderA.prod.length; j++) {
      t = t + 1;
      products.push({
        id: orderA.prod[j].id,
        item: [
          { name: t },
          { name: orderA.prod[j].name },
          { name: orderA.prod[j].type },
          { name: orderA.prod[j].price },
          { name: orderA.prod[j].quantity },
        ],
      });
    }
    setOrderA(products);
  };

  const statOrder = async (valueInp) => {
    for (let i = 0; i < valueInp.length; i++) {
      const ord = new Order();
      ord.set({ id: valueInp[i] });
      await StatusOrder(ord.get());
      await listOrders();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await listOrders();
    };
    fetchData();
  }, []);

  return {
    orders,
    listOrders,
    handleOrderClick,
    statOrder,
  };
}
// AdminOrders end //
// *********************************************

// AdminUsers  begin
function useAdminUsers() {
  const [users, setUsers] = useState([]);

  const listUsers = async () => {
    let data = await Userss();
    let res = data.data_;
    let n = 0;
    let users = [];
    for (let i = 0; i < res.length; i++) {
      n = n + 1;
      users.push({
        id: res[i].id, item: [
          { name: n },
          { name: res[i].id },
          { name: res[i].login },
          { name: res[i].role },
          {
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
// AdminUsers  end //
// *********************************************

// Authorization  begin
function useAuthorization() {
  const setRoleUser = useDispatcher("role");
  const setRoleAdmin = useDispatcher("role");
  const setLogin = useDispatcher("login");
  /* редакс
        const dispatch = useDispatch();
    
        const setRoleUser = () => {
            dispatch({type: "setRole", payload: "user"})
        }
    
        const setRoleAdmin = () => {
            dispatch({type: "setRole", payload: "admin"})
        }
    
        const setLogin = (login) => {
            dispatch({type: "setLogin", payload: login})
        }
    
     */

  const [userNotFound, setUserNotFound] = useState();

  const auth = async (valueInp, valuePas) => {
    const userV = {
      login: valueInp,
      password: valuePas,
    };

    const user = new User();
    user.set(userV);
    const data = await Auth(user.get());
    if (data.status === 200) {
      localStorage.setItem("token", data.data_.token);
      const a = data.data_.token.split(".");
      const b = JSON.parse(atob(a[1]));
      setLogin(b.login);
      return { result: false, role: b.role };
    } else {
      return { result: true, role: "" };
    }
  };
  return {
    auth,
    setRoleUser,
    setRoleAdmin,
  };
}
// Authorization end //
// *********************************************

// Registration  begin
function useRegistration() {
  const [userAlreadyExists, setUserAlreadyExists] = useState();
  const reg = async (valueInp, valuePas) => {
    const userV = {
      login: valueInp,
      password: valuePas,
    };

    const user = new User();
    user.set(userV);
    const data = await Reg(user.get());
    setUserAlreadyExists(data.status !== 200);
  };

  return {
    userAlreadyExists,
    reg,
  };
}
// Registration  end //
// *********************************************

// UserBasket begin
function useUserBasket() {
  const Prod = useListenerProd();
  // const Prod = useListener("Prod");
  //const Prod = useSelector(state => state.Prod); редакс

  const [prodd, setProdd] = useState(Prod);
  const [sum, setSUM] = useState(0);

  const calcSum = (prodd) => {
    if (!prodd) return;
    let a = 0;
    for (let i = 0; i < prodd.length; i++) {
      a += prodd[i].item[2].name * prodd[i].item[3].name;
    }
    setSUM(a);
  };

  const handleAddingOrder = async () => {
    if (!prodd) return;
    let order = { products: [] };
    for (let i = 0; i < prodd.length; i++) {
      order.products.push({
        id: prodd[i].id,
        quantity: prodd[i].item[3].name,
      });
    }
    order.totalPrice = sum;
    const ord = new Order();
    ord.set(order);
    const resp = await AddOrder(ord.get());
    if (resp.status === 200) {

      setProdd([]);
      setSUM(0);
      return true;
    } else {

      return false;
    }
  };

  const listProducts = () => {
    if (!prodd) return;
    let products = [];
    for (let i = 0; i < prodd.length; i++) {
      if (prodd[i].item[4].name !== 0) {
        products.push({
          id: prodd[i].id, item: [
            { name: prodd[i].item[1].name },
            { name: prodd[i].item[2].name },
            { name: prodd[i].item[3].name },
            { name: prodd[i].item[4].name },
            {
              name: <a onClick={(event) => {
                setProdd((prevState) => {
                  calcSum(prevState.filter((index) => index.id !== prodd[i].id));
                  return prevState.filter((index) => index.id !== prodd[i].id);
                }); event.stopPropagation()
              }}><img src={del}></img></a>
            }]
        })
      }
    }
    setProdd(products);
    calcSum(products);
  };

  const handleDelete = (product) => {
    setProdd((prevState) => {
      calcSum(prevState.filter((index) => index.id !== product.id));
      return prevState.filter((index) => index.id !== product.id);
    });
  };

  useEffect(() => {
    setProdd(Prod);
    listProducts();
    return;
  }, []);

  return {
    prodd,
    sum,
    calcSum,
    handleAddingOrder,
    listProducts,
    handleDelete,
  };
}
// UserBasket end //
// *********************************************

// UserCatalog begin
let socket;
function useUserCatalog() {
  const [res, setRes] = useState();

  const [valueCounts, setValueCounts] = useState([]);

  const [prod, setProd] = useState([]);

  // мобикс
  const Prod = useListener("Prod");

  const setProducts = useDispatcher("Prod");

  /* редакс
        const Prod = useSelector(state => state.Prod);
    
        const dispatch = useDispatch();
    
        const setProducts = (prod) => {
            dispatch({type: "setProducts", payload: prod})
        }
    
  */

  useEffect(() => {
    socket = new WebSocket("ws://localhost:8080/shopProject-1" + "/message");
    socket.onmessage = (event) => {
      // alert(event.data);
    };
    return () => {
      socket.close();
    };
  }, []);

  const dataGet = () => {
    let n = 0;
    let products = [];
    for (let i = 0; i < res.length; i++) {
      n = n + 1;
      products.push({
        id: res[i].id,
        item: [
          { name: n },
          { name: res[i].name },
          { name: res[i].type },
          { name: res[i].price },
          { name: valueCounts[i] ?? 0 },
        ],
      });
    }
    setProducts(products);
    return products;
  };

  const listProducts = async () => {
    let data = await Products();
    let res = data.data_;
    let mas = [];
    for (let i = 0; i < res.length; i++) {
      mas.push(0);
    }
    setValueCounts(mas);
    setRes(res);
    WSocket(listProducts, "/asyncProducts");
  };

  const onClickMinus = (index) => {
    setValueCounts((prevState) => {
      const temp = [];
      for (let j = 0; j < prevState.length; j++) {
        if (j === index) {
          temp.push(prevState[j] + 1);
        } else {
          temp.push(prevState[j]);
        }
      }
      return temp;
    });
  };

  const onClickPlus = (index) => {
    setValueCounts((prevState) => {
      const temp = [];
      for (let j = 0; j < prevState.length; j++) {
        if (j === index && prevState[j] > 0) {
          temp.push(prevState[j] - 1);
        } else {
          temp.push(prevState[j]);
        }
      }
      return temp;
    });
  };

  useEffect(() => {
    if (res !== undefined) {
      setProd(dataGet());
    }
  }, [valueCounts, res]);

  useEffect(() => {
    const fetchData = async () => {
      await listProducts();
    };
    fetchData();
  }, []);

  return { prod, Prod, onClickMinus, onClickPlus };
}
// UserCatalog  end //
// *********************************************

// UserOrders begin
function useUserOrders() {
  const [orders, setOrders] = useState([]);

  // мобикс
  const setOrderU = useDispatcher("orderU");

  const setIdProdU = useDispatcher("idProdU");

  /* редакс
    const dispatch = useDispatch();

    const setOrderU = (ord) => {
        dispatch({type: "setOrderU", payload: ord})
    }

    const setIdProdU = (id) => {
        dispatch({type: "setIdProdU", payload: id})
    }

     */

  const listOrders = async () => {
    let data = await OrdersUser();
    let res = data.data_;
    let n = 0;
    let orders = [];
    for (let i = 0; i < res.length; i++) {
      n = n + 1;
      orders.push({
        products: res[i].products,
        id: res[i].id,
        item: [
          { name: n },
          { name: res[i].id },
          { name: res[i].totalPrice },
          { name: res[i].createdAt.substring(0, 10) },
          { name: res[i].status },
          res[i].id, // Save the ID separately for later use
        ],
      });
    }
    setOrders(orders);
  };

  const onClickInfo = (order) => {
    const orderU = { prod: order.products };
    const orderId = order.item[5]; // ID
    setIdProdU(orderId);
    let t = 0;
    let products = [];
    for (let j = 0; j < orderU.prod.length; j++) {
      t = t + 1;
      products.push({
        id: orderU.prod[j].id,
        item: [
          { name: t },
          { name: orderU.prod[j].name },
          { name: orderU.prod[j].type },
          { name: orderU.prod[j].price },
          { name: orderU.prod[j].quantity },
        ],
      });
    }
    setOrderU(products);
  };

  useEffect(() => {
    const fetchData = async () => {
      await listOrders();
    };
    fetchData();
  }, []);

  return { orders, onClickInfo };
}
// UserOrders end //
// *********************************************

export {
  useAdminProductAdding,
  useAdminCatalog,
  useAdminOrders,
  useAdminUsers,
  useAuthorization,
  useRegistration,
  useUserBasket,
  useUserCatalog,
  useUserOrders,
};
