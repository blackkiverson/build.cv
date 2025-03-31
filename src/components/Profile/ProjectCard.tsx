'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Keeping for backward compatibility
  imageUrls?: string[]; // New field for multiple images
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year?: string;
  achievements?: string[];
}

export function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  imageUrls,
  tags,
  liveUrl,
  githubUrl,
  featured = false,
  year = '2024',
  achievements = [],
}: ProjectProps) {
  // If no achievements are provided, create bullet points from the description
  // Split by newlines instead of periods to create bullet points for each line
  const bulletPoints = achievements.length > 0 
    ? achievements 
    : description.split('\n').filter(line => line.trim().length > 0);
    
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="p-5">
        <div className="flex items-start">
          {/* Year on the left */}
          <div className="w-16 text-gray-400 font-medium">{year}</div>
          
          {/* Content on the right */}
          <div className="flex-1">
            {/* Project title */}
            <h3 className="text-gray-100 font-medium text-lg">{title}</h3>
            
            {/* Tags - Moved directly under the title with enhanced background color */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Bullet points */}
            <ul className="mt-3 space-y-3">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start text-gray-300 text-sm">
                  <span className="mr-2 mt-1.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            {/* Links */}
            <div className="flex gap-3 mt-4">
              {liveUrl && (
                <Link 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-300 hover:text-gray-100 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </Link>
              )}
              {githubUrl && (
                <Link 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-300 hover:text-gray-100 text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </Link>
              )}
            </div>
            
            {/* Images at the bottom - displayed in a fixed row with square shapes */}
            {(imageUrls && imageUrls.length > 0) || imageUrl ? (
              <div className="flex flex-row gap-3 mt-4">
                {/* Display from imageUrls if available, otherwise fall back to imageUrl */}
                {imageUrls && imageUrls.length > 0 ? (
                  // Display up to 3 images from imageUrls in a row
                  imageUrls.slice(0, 3).map((imgUrl, index) => (
                    <div 
                      key={index} 
                      className="relative w-24 h-24 flex-none"
                    >
                      <Image 
                        src={imgUrl} 
                        alt={`${title} - image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))
                ) : (
                  // Fall back to single imageUrl for backward compatibility
                  <div className="relative w-24 h-24 flex-none">
                    <Image 
                      src={imageUrl!} 
                      alt={title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}