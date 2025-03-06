'use client';

import { Menu, Transition } from '@headlessui/react';
import { MoreHorizontal, Download, Edit } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  name: string;
  jobTitle: string;
  bio: string;
  lastEdited: string;
  avatarUrl?: string;
  onEdit: () => void;
  onPrint: () => void;
}

export function ProfileHeader({
  name,
  jobTitle,
  bio,
  lastEdited,
  avatarUrl,
  onEdit,
  onPrint
}: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative w-16 h-16">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-700 rounded-full" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-100">{name}</h1>
            <p className="text-gray-400 mt-1">{jobTitle}</p>
          </div>

          <Menu as="div" className="relative">
            <Menu.Button className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-300">
              <MoreHorizontal className="w-5 h-5" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onEdit}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-gray-300`}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onPrint}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-gray-300`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Print Profile
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
} 