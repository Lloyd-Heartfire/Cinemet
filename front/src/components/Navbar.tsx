'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { UserIcon, StarIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, disconnect } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black z-50 shadow px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link href="/" className="text-yellow-400 text-2xl font-bold hover:text-yellow-300 transition">
        Cinemet
      </Link>

      {/* Liens */}
      <div className="flex items-center space-x-6">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className={`hover:text-yellow-400 transition ${pathname === '/login' ? 'text-yellow-400 font-semibold' : 'text-white'}`}>
              Connexion
            </Link>
            <Link href="/register" className={`hover:text-yellow-400 transition ${pathname === '/register' ? 'text-yellow-400 font-semibold' : 'text-white'}`}>
              Inscription
            </Link>
          </>
        ) : (
          <>
            {/* Icônes */}
            <Link href="/profile" title="Profil">
              <UserIcon className="h-6 w-6 text-white hover:text-yellow-400 transition" />
            </Link>
            <Link href="/favorites" title="Favoris">
              <StarIcon className="h-6 w-6 text-white hover:text-yellow-400 transition" />
            </Link>
            <Link href="/watchlist" title="Watchlist">
              <EyeIcon className="h-6 w-6 text-white hover:text-yellow-400 transition" />
            </Link>

            {/* Déconnexion */}
            <button onClick={disconnect} className="text-white hover:text-red-500 font-medium transition" title="Déconnexion">
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
