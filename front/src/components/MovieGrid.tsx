'use client';

import { useEffect, useState } from 'react';
import { getAllMovies } from '@/app/api/movies';
import { getToken } from '@/app/api/auth';
import axios from 'axios';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';

const BASE_URL = "http://localhost:8000";

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(setMovies);
  }, []);

  const addToFavorites = async (movieId: number) => {
    try {
      const token = getToken();
      await axios.post(`${BASE_URL}/user-favorites/`, { movie: movieId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Ajouté aux favoris !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout aux favoris");
    }
  };

const addToWatchlist = async (movieId: number) => {
  const token = getToken();
  console.log("Token utilisé pour watchlist :", token);

  if (!token) {
    console.error("Aucun token trouvé, utilisateur non connecté.");
    alert("Vous devez être connecté pour ajouter un film à votre watchlist.");
    return;
  }

  try {
    await axios.post(`${BASE_URL}/user-watchlist/`, { movie: movieId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert("Film ajouté à la watchlist !");
  } catch (error: any) {
    console.error("Erreur lors de l'ajout à la watchlist :", error);
    if (error.response?.status === 401) {
      alert("Accès non autorisé : veuillez vous reconnecter.");
    } else {
      alert("Une erreur est survenue, réessayez plus tard.");
    }
  }
};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie: any) => (
        <div key={movie.id_movie} className="bg-gray-900 p-4 rounded shadow-lg text-white hover:scale-[1.01] transition">
          {movie.image_url && (
            <img src={movie.image_url} alt={`Affiche de ${movie.title}`} className="mb-4 w-full h-48 object-cover rounded"/>
          )}
          <h2 className="text-yellow-300 text-lg font-semibold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-400 mb-1">{movie.description}</p>
          <p className="text-sm text-gray-500">📅 {movie.release_date}</p>
          <p className="text-sm text-gray-500">⭐ {movie.average_rating}</p>
          <p className="text-sm text-gray-500">🏷️ {movie.categorie_name}</p>

          <div className="flex gap-3 mt-4">
            <button title="Ajouter aux favoris" onClick={() => addToFavorites(movie.id_movie)} className="hover:text-yellow-400 transition">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button title="Ajouter à la watchlist" onClick={() => addToWatchlist(movie.id_movie)} className="hover:text-blue-400 transition">
              <EyeIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
