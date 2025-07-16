'use client';

import { useEffect, useState } from 'react';
import { getAllMovies } from '@/app/api/movies';

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(setMovies);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie: any) => (
        <div key={movie.id_movie} className="bg-gray-900 p-4 rounded hover:shadow-xl transition">
            {movie.image_url && (<img src = {movie.image_url} alt = {`Affiche de ${movie.title}`} className = "mb-4 w-full h-48 object-cover rounded"/>)}
            <h2 className="text-yellow-300 text-lg font-semibold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-2">{movie.description}</p>
            <p className="text-sm text-gray-500">Sortie : {movie.release_date}</p>
            <p className="text-sm text-gray-500">Note moyenne : {movie.average_rating}</p>
            <p className="text-sm text-gray-500">Catégorie : {movie.categorie_name}</p>
        </div>
      ))}
    </div>
  );
}