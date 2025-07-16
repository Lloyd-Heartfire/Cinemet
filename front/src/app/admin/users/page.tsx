'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import {getToken} from '@/app/api/auth';

const BASE_URL = "http://localhost:8000";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = getToken();
            if (!token) return;

            try {
                const res = await axios.get(`${BASE_URL}/users/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(res.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">
            <h1 className="text-2xl font-bold mb-6">Utilisateurs</h1>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="py-2 px-4">Nom d’utilisateur</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Admin</th>
                  <th className="py-2 px-4">Superuser</th>
                  <th className="py-2 px-4">Inscription</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.is_staff ? 'X' : '—'}</td>
                    <td className="py-2 px-4">{user.is_superuser ? 'X' : '—'}</td>
                    <td className="py-2 px-4">{user.date_joined?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </main>
    );
}