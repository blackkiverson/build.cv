'use client';

import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import { dummyProfile } from '@/lib/dummyData';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-16 bg-gray-900 border-r border-gray-800/30 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center">
        <Link 
          href="/profile"
          className="p-3 rounded-lg text-gray-500 hover:text-gray-300"
        >
          <UserCircle className="w-6 h-6" />
        </Link>
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