import config from 'config';
import { authHeader } from '../_helpers';
import axios from '../_helpers/axios';

export const userService = {
    login,
    logout,
    register,
    handleResponse
};

function login(userNameOrEmail, password) {

    return axios.post("/login", { userNameOrEmail: userNameOrEmail, password: password })
        .then(handleResponse)
        .then(response => {
            console.log(response);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response));
            console.log(response.username);
            return response.username;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post("/register", user).then(handleResponse);
}

function handleResponse(response) {
    console.log(response);
    const data = response.data;
    if (!data.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data.data;
}