'use client';

import { Sidebar } from '@/components/Layout/Sidebar';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { dummyProfile } from '@/lib/dummyData';
import { PenSquare } from 'lucide-react';

export default function ProfilePage() {
  const handleEdit = () => {
    // Will implement edit functionality
    console.log('Edit clicked');
  };

  const handlePrint = () => {
    // Will implement print functionality
    console.log('Print clicked');
  };

  return (
    <div className="flex min-h-screen bg-gray-800">
      <Sidebar />
      <div className="flex-1 ml-16">
        <div className="max-w-3xl mx-auto py-12 px-8">
          <ProfileHeader
            name={dummyProfile.name}
            jobTitle={dummyProfile.headline}
            bio={dummyProfile.bio}
            lastEdited="March 6, 2025"
            avatarUrl={dummyProfile.avatar}
            onEdit={handleEdit}
            onPrint={handlePrint}
          />
          
          <div className="mt-8 space-y-8">
            {/* Status section */}
            <div className="bg-gray-700/50 rounded-lg p-6">
              <p className="text-gray-300">Currently searching for that first break through...</p>
              <p className="text-gray-500 text-sm mt-2">2 months ago</p>
            </div>

            {/* About section */}
            <div className="space-y-2">
              <h2 className="text-gray-200 text-lg font-semibold">About</h2>
              <p className="text-gray-300">{dummyProfile.bio}</p>
            </div>

            {/* Projects section placeholder */}
            <div className="space-y-2">
              <h2 className="text-gray-200 text-lg font-semibold">Projects</h2>
              {/* Project items will go here */}
            </div>
          </div>
        </div>

        {/* Edit Profile CTA */}
        <div className="fixed bottom-8 left-24">
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full text-sm text-gray-300 hover:bg-gray-800"
          >
            <PenSquare className="w-4 h-4" />
            <span>Edit profile</span>
          </button>
        </div>
      </div>
    </div>
  );
} 