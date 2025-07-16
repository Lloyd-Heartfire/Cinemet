'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { getToken } from '@/app/api/auth';

const BASE_URL = 'http://localhost:8000';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [userRating, setUserRating] = useState<number | null>(null);
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movies/${id}/`);
        setMovie(res.data);
      } catch (error) {
        console.error('Erreur chargement film :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const addToFavorites = async (movieId: number) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Token manquant');

      await axios.post(
        `${BASE_URL}/user-favorites/`,
        { movie: movieId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Ajouté aux favoris !');
    } catch (error) {
      console.error("Erreur favoris :", error);
      alert("Impossible d'ajouter aux favoris.");
    }
  };

  const addToWatchlist = async (movieId: number) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Vous devez être connecté.");
        return;
      }

      await axios.post(
        `${BASE_URL}/user-watchlist/`,
        { movie: movieId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Ajouté à la watchlist !');
    } catch (error: any) {
      console.error('Erreur watchlist :', error);
      if (error.response?.status === 401) {
        alert('Accès non autorisé : reconnectez-vous.');
      } else {
        alert('Erreur, réessayez plus tard.');
      }
    }
  };

  const submitRating = async () => {
    const token = getToken();
    if (!token || userRating === null) return;

    setIsRatingSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/rate-movie/`, {
        movie: movie.id_movie,
        rating: userRating
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Note enregistrée !');
    } catch (err) {
      console.error('Erreur enregistrement note :', err);
      alert('Impossible d\'envoyer la note.');
    } finally {
      setIsRatingSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Chargement du film…
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Film introuvable.
      </div>
    );
  }

  return (
    <div className="px-6 py-10 text-white bg-gradient-to-br from-black via-gray-950 to-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">{movie.title}</h1>

      {movie.image_url && (
        <img
          src={movie.image_url}
          alt={`Affiche de ${movie.title}`}
          className="mx-auto mb-6 w-full max-w-md h-96 object-cover rounded-lg shadow-lg"
        />
      )}

      <div className="max-w-3xl mx-auto space-y-4 text-gray-300 text-base leading-relaxed">
        {movie.description && <p>{movie.description}</p>}
        {movie.release_date && <p>Date de sortie : {movie.release_date}</p>}
        {movie.duration && <p>Durée : {movie.duration} min</p>}
        {movie.average_rating !== undefined && <p>Note moyenne : {movie.average_rating}</p>}
        {movie.categorie_name && <p>Catégorie : {movie.categorie_name}</p>}
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => addToFavorites(movie.id_movie)}
          className="text-yellow-400 hover:text-yellow-300 transition"
          title="Ajouter aux favoris"
        >
          <HeartIcon className="h-8 w-8" />
        </button>
        <button
          onClick={() => addToWatchlist(movie.id_movie)}
          className="text-blue-400 hover:text-blue-300 transition"
          title="Ajouter à la watchlist"
        >
          <EyeIcon className="h-8 w-8" />
        </button>
      </div>

      <div className="max-w-md mx-auto mt-14 bg-gray-800 rounded p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">Votre note</h3>
        <select
          value={userRating ?? ''}
          onChange={(e) => setUserRating(parseInt(e.target.value))}
          className="w-full bg-gray-900 text-white p-2 rounded mb-4"
        >
          <option value="" disabled>Sélectionner une note</option>
          <option value="1">1 - Très mauvais</option>
          <option value="2">2 - Moyen</option>
          <option value="3">3 - Correct</option>
          <option value="4">4 - Bon</option>
          <option value="5">5 - Excellent</option>
        </select>

        <button
          onClick={submitRating}
          disabled={userRating === null || isRatingSubmitting}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition"
        >
          {isRatingSubmitting ? "Envoi en cours..." : "Enregistrer la note"}
        </button>
      </div>
    </div>
  );
}