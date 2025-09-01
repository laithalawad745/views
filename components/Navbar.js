'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-500">
          📈 منصة التحليل الفني
        </Link>
        
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm">
                مرحباً، {session.user?.name || session.user?.email}
              </span>
              <img 
                src={session.user?.image || ''} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <Link 
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}