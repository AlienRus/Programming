export class Product {
    constructor() {
        this.product = {
            id: undefined,
            name: undefined,
            price: undefined,
            type: undefined,
        };
    }

    get() {
        return this.product;
    }

    set(product) {
        this.product = product;
    }
}