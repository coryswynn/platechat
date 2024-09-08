'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router'; // Use router for redirects
import { auth } from '../lib/firebaseConfig';
import { Button } from '../components/button'; // Assuming you have a Button component

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); // User state can be null or Firebase User
  const router = useRouter(); // Router instance for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google and redirect to the correct page
  const handleSignIn = async (isSignUp: boolean) => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      if (isSignUp) {
        router.push('/signup'); // Redirect to /signup after signing up
      } else {
        router.push('/'); // Redirect to home page after signing in
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  // Sign out the user
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  return (
    <header className="bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          PlateChat
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* <span className="text-white">Hello, {user?.displayName || 'User'}</span> */}
              <Button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleSignIn(true)} // Trigger Google login for Sign Up and redirect to /signup
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => handleSignIn(false)} // Trigger Google login for Sign In and redirect to home
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}