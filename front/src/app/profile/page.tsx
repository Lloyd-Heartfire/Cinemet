'use client';

import {useEffect, useState} from 'react';
import {getFavorites, getWatchList} from '@/app/api/movies';

export default function ProfilePage() {
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        getFavorites().then(setFavorites);
        getWatchList().then(setWatchlist);
    }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-yellow-400 text-3xl font-bold mb-6 text-center">Mon Profil</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Films favoris</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie: any) => (
            <div key={movie.id_movie} className="bg-gray-800 p-4 rounded">
              <p className="text-yellow-300 font-bold">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Ma watchlist</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {watchlist.map((movie: any) => (
            <div key={movie.id_movie} className="bg-gray-800 p-4 rounded">
              <p className="text-blue-300 font-bold">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}