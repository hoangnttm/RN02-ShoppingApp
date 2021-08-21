import axios from "axios"
import { BASE_URL } from '../assets/index'
import { getAccessTokenSelector } from "../redux/selectors/loginSelector";
import store from "../redux/store";

export const userSignUp = (data) => {
    return axios({
        url: `${BASE_URL}/api/Users/signup`,
        method: 'POST',
        data: data,
    });
}
export const userLogin = (data) => {
    return axios({
        url: `${BASE_URL}/api/Users/signin`,
        method: 'POST',
        data: data,
    });
}
export const userChangePassword = (data) => {
    var state = store.getState();
    var token = getAccessTokenSelector(state);
    return axios({
        url: `${BASE_URL}/api/Users/changePassword`,
        method: 'POST',
        data: data,
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const userGetProfile = (data) => {
    var state = store.getState();
    var token = getAccessTokenSelector(state);
    return axios({
        url: `${BASE_URL}/api/Users/getProfile`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const userUpdateProfile = (data) => {
    var state = store.getState();
    var token = getAccessTokenSelector(state);
    return axios({
        url: `${BASE_URL}/api/Users/updateProfile`,
        method: 'POST',
        data: data,
        headers: { Authorization: `Bearer ${token}` }
    });
}