'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/api/auth'; // ← adapte selon ton arborescence

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {e.preventDefault();
    try {
      const { access } = await login(form.username, form.password);
      alert('Connexion réussie');
      router.push('/');
    } catch (err: any) {
      console.error('Erreur:', err.response?.data || err.message);
      alert('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded w-96 mx-auto mt-20 text-white">
      <h1 className="text-yellow-400 text-2xl font-bold text-center mb-6">Connexion</h1>

      <input  name="username" placeholder="Nom d'utilisateur" onChange={handleChange} className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"/>
      <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} className="w-full p-3 mb-6 rounded bg-gray-800 text-white placeholder-gray-400"/>
      <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition">
        Se connecter
      </button>
    </form>
  );
}