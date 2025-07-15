'use client';

import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/token", form);
            
            //Stockage du token
            localStorage.setItem("token", res.data.access);

            //Redirige vers la page d'accueil
            router.push("/");
        } catch (err) {
            alert("Identifiants invalides");
        }
    };

    return (
        <div className = "bg-black min-h-screen flex items-center justify-center text-white">
            <form onSubmit = {handleSubmit} className = "bg-gray-900 p-8 rounded w-96">
               <h1 className = "text-yellow-400 text-2xl font-bold mb-6 text-center">Connexion</h1>
               <input name = "username" placeholder = "Nom d'utilisateur" onChange = {handleChange} className = "w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"/>
               <input name = "password" type = "password" placeholder = "Mot de passe" onChange = {handleChange} className = "w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"/>
               <button className = "w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500">Se connecter</button>
            </form>
        </div>
    );
}