import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          PlateChat
        </Link>
        <div className="flex space-x-4">
          <Link href="/signup">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
              Sign Up
            </button>
          </Link>
          <Link href="/signin">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Sign In
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}