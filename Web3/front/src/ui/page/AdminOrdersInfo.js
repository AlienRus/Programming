import { useState } from "react";
import Menu from "../comp/menu";
import Tabl from "../comp/tabl";
import "../../css/fon.css"
import Title from "../comp/title";
//import {useSelector} from "react-redux";
import { useListenerIdProdA, useListenerOrderA } from "../../store/store";

function AdminOrdersInfo() {

    const [valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) => { setValueInp(valueInp) }

    // мобикс
    const orderA = useListenerOrderA();

    const idProdA = useListenerIdProdA();

    /* редакс
    const orderA = useSelector(state => state.orderA);

    const idProdA = useSelector(state => state.idProdA);
     */

    return (
        <>
            <Title title={"Заказ с ID " + String(idProdA)}></Title>
            <Menu role="admin" ></Menu>
            <Tabl tytles={[
                { id: 1, name: '№' },
                { id: 2, name: 'Название' },
                { id: 3, name: 'Категория' },
                { id: 4, name: 'Цена' },
                { id: 5, name: 'Кол-во' },
            ]} items={orderA ?? []} onChange={ValueInp} ></Tabl>
        </>
    );
}

export default AdminOrdersInfo;
