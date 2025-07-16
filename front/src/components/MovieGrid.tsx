'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { getToken } from '@/app/api/auth';

const BASE_URL = "http://localhost:8000";

export default function MovieGrid() {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movies/`);
        console.log("Films reçus :", response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des films :", error);
      }
    };

    fetchMovies();
  }, []);

  const addToFavorites = async (movieId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // évite conflit avec navigation
    try {
      const token = getToken();
      if (!token) throw new Error("Token manquant");

      await axios.post(
        `${BASE_URL}/user-favorites/`,
        { movie: movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Ajouté aux favoris !");
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
      alert("Erreur lors de l'ajout aux favoris");
    }
  };

  const addToWatchlist = async (movieId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const token = getToken();

    if (!token) {
      alert("Vous devez être connecté pour ajouter un film à votre watchlist.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/user-watchlist/`,
        { movie: movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
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

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) =>
      selectedCategory ? movie.categorie_name === selectedCategory : true
    );

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-black via-gray-950 to-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">
        Sélection de Films
      </h1>

      <div className="mb-10 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Rechercher un film"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 w-full md:w-1/2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Toutes les catégories</option>
          <option value="Aventure">Aventure</option>
          <option value="Science-Fiction">Science-Fiction</option>
          <option value="Drame">Drame</option>
          <option value="Thriller">Thriller</option>
          <option value="Fantastique">Fantastique</option>
          <option value="Horreur">Horreur</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory("");
          }}
          className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white transition"
        >
          Réinitialiser
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredMovies.map((movie) => (
          <Link key={movie.id_movie} href={`/movies/${movie.id_movie}`}>
            <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-200 transform hover:-translate-y-1 cursor-pointer">
              {movie.image_url && (
                <img
                  src={movie.image_url}
                  alt={`Affiche de ${movie.title}`}
                  className="w-full h-64 object-cover rounded-t-lg hover:opacity-90 transition duration-200"
                />
              )}

              <div className="p-5 flex flex-col justify-between h-full">
                <h2 className="text-white text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-2 line-clamp-3">
                  {movie.description}
                </p>

                <div className="text-sm text-gray-300 space-y-1 mb-4">
                  {movie.release_date && <p>Date de sortie : {movie.release_date}</p>}
                  {movie.duration && <p>Durée : {movie.duration} minutes</p>}
                  {movie.average_rating !== undefined && <p>Note moyenne : {movie.average_rating}</p>}
                  {movie.categorie_name && <p>Catégorie : {movie.categorie_name}</p>}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={(e) => addToFavorites(movie.id_movie, e)}
                    title="Ajouter aux favoris"
                    className="text-yellow-400 hover:text-yellow-300 transition"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => addToWatchlist(movie.id_movie, e)}
                    title="Ajouter à la watchlist"
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    <EyeIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}