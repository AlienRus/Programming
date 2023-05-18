import { AddProduct } from "../../trans/req/reqF";
import { Product } from "../../trans/product";

//AdminAddProduct
export function useAdminProductAdding() {
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