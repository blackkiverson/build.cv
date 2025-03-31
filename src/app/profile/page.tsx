'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Layout/Sidebar';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProjectCard } from '@/components/Profile/ProjectCard';
import { EditProfileOverlay } from '@/components/Profile/EditProfileOverlay';
import { dummyProfile, dummyProjects } from '@/lib/dummyData';
import { PenSquare } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  
  const handleEdit = () => {
    setIsEditOverlayOpen(true);
  };

  const handlePrint = () => {
    // Import dynamically to avoid SSR issues
    import('@/utils/printUtils').then(({ printProfile }) => {
      printProfile();
    });
  };

  const handleSaveProfile = async (data: any) => {
    try {
      // Map the form data to match the expected API format
      const apiData = {
        name: data.displayName,
        headline: data.jobTitle,
        bio: data.bio,
        status: data.status,
        location: data.location,
        website: data.website,
        projects: data.projects
      };

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      // In a real app, we would update the UI with the response data
      console.log('Profile updated successfully');
      
      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
              <p className="text-gray-300">{dummyProfile.status}</p>
              <p className="text-gray-500 text-sm mt-2">{dummyProfile.statusDate}</p>
            </div>

            {/* About section */}
            <div className="space-y-2">
              <h2 className="text-gray-200 text-lg font-semibold">About</h2>
              <p className="text-gray-300">{dummyProfile.bio}</p>
            </div>

            {/* Projects section */}
            <div className="space-y-4">
              <h2 className="text-gray-200 text-lg font-semibold">Projects</h2>
              <div className="grid grid-cols-1 gap-6 mt-2">
                {dummyProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    imageUrls={project.imageUrls}
                    tags={project.tags}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    featured={project.featured}
                  />
                ))}
              </div>
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

        {/* Edit Profile Overlay */}
        <EditProfileOverlay 
          isOpen={isEditOverlayOpen} 
          onClose={() => setIsEditOverlayOpen(false)} 
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  );
}