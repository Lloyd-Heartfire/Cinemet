'use client';

interface Movie {
  id_movie: number;
  title: string;
  image_url?: string;
  categorie_name?: string;
  duration?: number;
  release_date?: string;
  average_rating?: number;
}

interface Props {
  movies: Movie[];
}

export default function FavoritesGrid({ movies }: Props) {
  if (movies.length === 0) return <p>Aucun film en favoris.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div
          key={movie.id_movie}
          className="bg-gray-900 p-4 rounded-lg shadow hover:scale-[1.01] transition"
        >
          {movie.image_url && (
            <img
              src={movie.image_url}
              alt={movie.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
          )}
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <div className="text-sm text-gray-400 mt-2 space-y-1">
            {movie.release_date && <p>Date de sortie : {movie.release_date}</p>}
            {movie.duration && <p>Durée : {movie.duration} min</p>}
            {movie.average_rating !== undefined && <p>Note moyenne : {movie.average_rating}</p>}
            {movie.categorie_name && <p>Catégorie : {movie.categorie_name}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
