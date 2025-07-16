'use client'

import {useEffect, useState} from 'react';
import {getUserInfo} from '@/app/api/auth';
import {useRouter} from 'next/navigation';

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const user = await getUserInfo();
                if (user.is_staff || user.is_superuser) {
                    setIsAdmin(true);
                } else {
                    router.push("/");
                }
            } catch (error) {
                console.error("Erreur lors de la vérification administrateur :", error);
                router.push("/login");
            }
        };

        verifyAdmin();
    }, [router]);

    if (!isAdmin) return null;

    return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Panneau d’administration</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminSection title="Gérer les films" href="/admin/movies" />
        <AdminSection title="Gérer les catégories" href="/admin/categories" />
        <AdminSection title="Gérer les acteurs" href="/admin/actors" />
        <AdminSection title="Gérer les réalisateurs" href="/admin/realisators" />
        <AdminSection title="Gérer les images" href="/admin/images" />
        <AdminSection title="Gérer les utilisateurs" href="/admin/users" />
      </section>
    </main>
  );
}

function AdminSection({title, href}: {title: string; href:string}) {
    return (
        <a href = {href} className = "block border border-gray-700 rounded p-6 hover:border-yellow-400 hover:text-yellow-400 transition">
            <span className = "text-lg font-medium">{title}</span>
        </a>
    );
}