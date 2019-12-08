import config from 'config';
import { authHeader } from '../_helpers';
import axios from '../_helpers/axios';
import { history } from '../_helpers';
import { userConstants } from '../_constants';

export const userService = {
    login,
    logout,
    register,
    handleResponse,
    get_top_players
};

function login(userNameOrEmail, password) {

    return axios.post("/login", { userNameOrEmail: userNameOrEmail, password: password })
        .then(handleResponse)
        .catch(error => handleResponse(error.response))
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
    return axios.post("/register", user).then(handleResponse).catch(error => handleResponse(error.response));
}

function handleResponse(response) {
    console.log(response);
    const data = response.data;
    if (!data.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            history.push('/login')
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data.data;
}

function get_top_players(dispatch) {
    console.log("AXIOS GET IT");
    return axios.post("/top")
        .then((response) => {
            console.log("AXIOS I AM IN");
            let data = response.data;
            console.log("AXIOS RECEIVED", data.top_players_usernames, data.top_results);
            let users = data.top_players_usernames;
            let winrate = data.top_results;
            dispatch(received(users, winrate));
        },
            (error) => {
                console.log("ERROR!!!!!!");
                console.log(error);
            }
        )
    function received(users, winrate) {
        return { type: userConstants.TOP10_RECEIVED, payload: { users: users, winrate: winrate } };
    };
}