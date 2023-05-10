export class User {
    constructor() {
        this.user = {
            id: undefined,
            login: undefined,
            password: undefined,
            role: undefined,
        };
    }

    get() {
        return this.user;
    }

    set(user) {
        this.user = user;
    }
}