import { DeleteProduct, Products } from "../../trans/req/reqF";
import { WSocket } from "../../trans/websocket/websocket";
import { useEffect, useState } from "react";

// AdminCatalog 

export function useAdminCatalog() {
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
        handleProductsDelete,
    };
}