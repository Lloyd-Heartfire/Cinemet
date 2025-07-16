import axios from 'axios';
import {getToken} from './auth';

const BASE_URL = "http://localhost:8000";

export async function getAllMovies() {
    const res = await axios.get(`${BASE_URL}/movies/`);
    return res.data.results;
}

export async function getFavorites() {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/user-favorites/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export async function getWatchList() {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/user-watchlist/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}