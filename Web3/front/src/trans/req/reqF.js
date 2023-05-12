import {fetchData} from "./req";


export async function Auth(user) {
    return await fetchData("/users/auth", "POST", user);}

export async function Reg(user) {
    return await fetchData("/users/reg", "POST", user);}

export async function Products() {
    return await fetchData("/products/", "GET");}

export async function AddProduct(product) {
    return await fetchData("/products/", "POST", product);}

export async function DeleteProduct(product) {
    return await fetchData("/products/", "DELETE", product);}

export async function AddOrder(order) {
    return await fetchData("/users/orders/", "POST", order);}

export async function OrdersUser() {
    return await fetchData("/users/orders/", "GET");}

export async function Orders() {
    return await fetchData("/orders/", "GET");}

export async function StatusOrder(order) {
    return await fetchData("/orders/status", "POST", order);}

export async function Userss() {
    return await fetchData("/users", "GET");}

export async function StatusUser(user){
    return await fetchData("/users/status", "POST", user)
}

export async function DeleteUser(user){
    return await fetchData("/users/", "DELETE", user);}



