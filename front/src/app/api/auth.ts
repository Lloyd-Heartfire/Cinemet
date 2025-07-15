import axios from 'axios';

const BASE_URL = "http://localhost:8000"

// Envoi des identifiants afin d'obtenir un access/refresh token
export async function login(username: string, password: string) {
    const res = await axios.post(`${BASE_URL}/token/`, {username, password});
    const {access, refresh} = res.data;

    // Stockage des tokens en localStorage
    localStorage.setItem("token", access);
    localStorage.setItem("refreshToken", refresh);

    return res.data;
}

export async function register(username: string, email: string, password: string) {
    const res = await axios.post(`${BASE_URL}/register/`, {username, email, password,});

    return res.data;
}

// Récupère le token access depuis localStorage
export function getToken() {
    return localStorage.getItem('token');
}

// Rafraîchit le token access si celui-ci a expiré
export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Token Refresh non disponible.");

    const res = await axios.post(`${BASE_URL}/token/refresh/`, {refresh: refreshToken,});

    const {access} = res.data;
    localStorage.setItem("token", access);
    return access;
}

// Déconnexion de l'utilisateur
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
}