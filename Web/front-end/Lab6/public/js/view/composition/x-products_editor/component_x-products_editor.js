import React from 'react';
import XButton from './../../component/x-button/component.js';
import XInput from './../../component/x-input/component.js';
import XTable from './../../component/x-table/component.js';
import { ProductFactory } from '../../../domain/service.js';
import { RouterFactory } from './../../route/router.js';

class XProductsEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            name: '',
            price: '',
            description: ''
        };
    }

    async componentDidMount() {
        await this.fetchProducts();
    }

    async fetchProducts() {
        let product = ProductFactory.createInstance();
        let result = await product.get();
        if (result.status === 200) {
            this.setState({ products: result.data });
        } else if (result.status === 401) {
            localStorage.removeItem('AutoSellUserToken');
            let router = RouterFactory.createInstance();
            router.go('login');
        }
    }

    async handleAddProduct(event) {
        event.preventDefault();
        let product = ProductFactory.createInstance();
        product.setProduct(this.state.name, this.state.price, this.state.description);
        let result = await product.add();
        if (result.status === 200) {
            await this.fetchProducts();
            this.setState({ name: '', price: '', description: '' });
        } else if (result.status === 401) {
            localStorage.removeItem('AutoSellUserToken');
            let router = RouterFactory.createInstance();
            router.go('login');
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleExit() {
        localStorage.removeItem('AutoSellUserToken');
        let router = RouterFactory.createInstance();
        router.go('login');
    }

    render() {
        return (
            <div>
                <h1>AutoSell</h1>
                <XTable products={this.state.products} />
                <form onSubmit={this.handleAddProduct.bind(this)}>
                    <XInput name="name" label="Name" value={this.state.name} onChange={this.handleInputChange.bind(this)} />
                    <XInput name="price" label="Price" value={this.state.price} onChange={this.handleInputChange.bind(this)} />
                    <XInput name="description" label="Description" value={this.state.description} onChange={this.handleInputChange.bind(this)} />
                    <XButton type="submit">Add</XButton>
                </form>
                <XButton onClick={this.handleExit.bind(this)}>Exit</XButton>
            </div>
        );
    }
}

export default XProductsEditor;
