'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { getToken } from '@/app/api/auth';

const BASE_URL = 'http://localhost:8000';

// Lazy-loaded components
const UserInfoBlock = lazy(() => import('@/components/UserInfoBlock'));
const FavoritesGrid = lazy(() => import('@/components/FavoritesGrid'));
const WatchlistGrid = lazy(() => import('@/components/WatchlistGrid'));

interface Movie {
  id_movie: number;
  title: string;
  image_url?: string;
  categorie_name?: string;
  duration?: number;
  release_date?: string;
  average_rating?: number;
}

interface User {
  id_user: number;
  username: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const fetchData = async () => {
      try {
        const meRes = await axios.get(`${BASE_URL}/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(meRes.data);

        const favRes = await axios.get(`${BASE_URL}/user-favorites/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favRes.data);

        const watchRes = await axios.get(`${BASE_URL}/user-watchlist/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(watchRes.data);
      } catch (error) {
        console.error('Erreur profil:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 py-10 bg-gradient-to-br from-black via-gray-950 to-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Profil utilisateur</h1>

      <Suspense fallback={<p className="text-center text-gray-400 mb-8">Chargement des infos utilisateur…</p>}>
        {user && <UserInfoBlock user={user} />}
      </Suspense>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Favoris</h2>
        <Suspense fallback={<p className="text-gray-500">Chargement des favoris…</p>}>
          <FavoritesGrid movies={favorites} />
        </Suspense>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
        <Suspense fallback={<p className="text-gray-500">Chargement de la watchlist…</p>}>
          <WatchlistGrid movies={watchlist} />
        </Suspense>
      </section>
    </div>
  );
}
