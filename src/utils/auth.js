// utils/auth.js
import axios from "axios";

export function isLoggedIn() {
    return axios.get('/user/current');
}