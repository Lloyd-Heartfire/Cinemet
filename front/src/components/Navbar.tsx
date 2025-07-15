'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {UserIcon, StarIcon, EyeIcon} from '@heroicons/react/24/outline';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className = "fixed top-0 left-0 w-full bg-black z-50 px-6 py-4 flex justify-between items-center">
            <Link href = "/" className = "text-yellow-400 text-xl font-bold hover:text-yellow-300 transition">
                Cinemet
            </Link>

            <div className = "flex items-center space-x-6">
                <Link href="/login" className={`text-white hover:text-yellow-400 transition ${pathname === '/login' ? 'text-yellow-400 font-bold' : ''}`}>
                    Connexion
                </Link>
                <Link href="/register" className={`text-white hover:text-yellow-400 transition ${pathname === '/register' ? 'text-yellow-400 font-bold' : ''}`}>
                    Inscription
                </Link>

                <button title = "Profil">
                    <UserIcon className = "h-6 w-6 text-white hover:text-yellow-400 transition"/>
                </button>
                <button title = "Favoris">
                    <StarIcon className = "h-6 w-6 text-white hover:text-yellow-400 transition"/>
                </button>
                <button title = "Watchlist">
                    <EyeIcon className = "h-6 w-6 text-white hover:text-yellow-400 transition"/>
                </button>
            </div>
        </nav>
    );
}