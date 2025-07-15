'use client';

import {Suspense} from 'react';
import MovieGrid from '../components/MovieGrid';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white px-6 pt-24">
      <h1 className = "text-yellow-400 text-2xl font-bold mb-6">Films à l'affiche</h1>
      
      <Suspense fallback={<p className = "text-gray-400 text-center py-6">Chargement des films...</p>}>
        <MovieGrid />
      </Suspense>
    </main>
  );
}