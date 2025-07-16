'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {register} from '@/app/api/auth';

export default function RegisterPage() {
    const [form, setForm] = useState({username: "", email: "", password: ""});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e: React.FormEvent) => {e.preventDefault();
    try {
      await register(form.username, form.email, form.password);
            alert("Compte créé ! Bienvenue sur Cinemet !");
            router.push("/login");
        } catch (err: any) {
            console.error('Erreur:', err.response?.data || err.message);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className = "bg-black min-h-screen flex items-center justify-center text-white">
            <form onSubmit = {handleSubmit} className = "bg-gray-900 p-8 rounded w-96">
                <h1 className = "text-yellow-400 text-2xl font-bold mb-6 text-center">Inscription</h1>
                <input name = "username" placeholder = "Nom d'utilisateur" onChange = {handleChange} className = "w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"/>
                <input name = "email" placeholder = "Email" onChange = {handleChange} className = "w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"/>
                <input name = "password" type = "password" placeholder = "Mot de passe" onChange = {handleChange} className = "w-full p-3 mb-6 rounded bg-gray-800 text-white placeholder-gray-400"/>
                <button className = "w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500">S'inscrire</button>
            </form>
        </div>
    );
}