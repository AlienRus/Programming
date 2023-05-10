export class Order {
    constructor() {
        this.order = {
            id: undefined,
            id_user: undefined,
            products: [],
            status: undefined,
            createdAt: undefined
        };
    }

    get() {
        return this.order;
    }

    set(order) {
        this.order = order;
    }
}