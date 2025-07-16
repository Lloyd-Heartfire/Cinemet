'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MovieGrid() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/movies/")
        .then(res => setMovies(res.data));
    }, []);

    return (
        <div className= "grid grid-cols-1 md:grid-cols-3 gap-6">
            {movies.map((movie: any) => (
                <div key = {movie.id_movie} className = "bg-gray-900 rounded-lg p-4 shadow hover:shadow-xl transition">
                    <h2 className = "text-yellow-400 text-xl font-semibold mb-2">{movie.title}</h2>
                    <p className = "text-sm text-gray-300 mb-1">Note moyenne : {movie.average_rating}</p>
                    <p className = "text-sm text-gray-400 mb-1">Année : {movie.release_year || "Inconnue"}</p>
                    <p className = "text-sm text-gray-400">Catégorie : {movie.categorie_name || "Aucune catégorie"}</p>
                </div>
            ))}
        </div>
    );
}