import axios from "axios"

export const getAllCategoriesApi = (data) => {
    return axios({
        url: 'http://svcy3.myclass.vn//api/Product/getAllCategory',
        method: 'GET',
        data: data,
    });
}
