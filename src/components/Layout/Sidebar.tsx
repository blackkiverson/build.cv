'use client';

import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import { dummyProfile } from '@/lib/dummyData';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-16 bg-gray-800 border-r border-gray-700/30 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative group">
          <Link 
            href="/profile"
            className="p-3 rounded-lg text-gray-500 flex items-center"
          >
            <UserCircle className="w-6 h-6" />
          </Link>
          <div className="absolute ml-12 mt-[-37px] px-2 py-1 bg-gray-900 rounded-md text-sm text-gray-200 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible animate-fadeIn">
            Profile
          </div>
        </div>
      </div>

      <div className="pb-4 flex justify-center w-full">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={dummyProfile.avatar}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </aside>
  );
} 