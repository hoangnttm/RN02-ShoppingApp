import axios from "axios"
import { getAccessTokenSelector, getCurrentUserSelector } from '../redux/selectors/loginSelector'
import store from '../redux/store'



export const getProductByCategoryId = (categoryId) => {
    return axios({
        url: `http://svcy3.myclass.vn/api/Product/getProductByCategory`,
        method: 'GET',
        params: { categoryId }
    });
}
export const getProductById = (id) => {
    return axios({
        url: 'http://svcy3.myclass.vn/api/Product/getbyid',
        method: 'GET',
        params: { id },
    });
}
export const getProducts = (id) => {
    return axios({
        url: 'http://svcy3.myclass.vn/api/Product',
        method: 'GET',
        params: id ? null : { id },
    });
}
export const getProductfavoriteAPI = () => {
    var state = store.getState();
    var token = getAccessTokenSelector(state);
    return axios({
        url: `http://svcy3.myclass.vn/api/Users/getproductfavorite`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const likeProductAPI = ({id}) => {
    console.log("likeProductAPI");
    console.log(id);
    var state = store.getState();
    var token = getAccessTokenSelector(state);
    return axios({
        url: `http://svcy3.myclass.vn/api/Users/like`,
        method: 'GET',
        params: { productId:id },
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const unlikeProductAPI = (productId) => {
    var state = store.getState();
    var token = getAccessTokenSelector(state);
    return axios({
        url: 'http://svcy3.myclass.vn/api/Users/unlike',
        method: 'GET',
        params: { productId: productId },
        headers: { Authorization: 'Bearer ' + token }
    });
}

export const orderAPI = (products) => {
    var state = store.getState();
    var currentUser = getCurrentUserSelector(state);
    var _data = {
        orderDetail: products,
        email: currentUser.email
    };
    console.info(_data);
    return axios({
        url: 'http://svcy3.myclass.vn/api/Users/order',
        method: 'POST',
        data: _data,
    });
}