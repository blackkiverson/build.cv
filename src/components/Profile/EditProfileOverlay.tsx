'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Save, Plus, Trash, ExternalLink, Github, User, Briefcase, MapPin, Globe, FileText, Settings, Bell, Shield, Users, Image } from 'lucide-react';
import { dummyProfile, dummyProjects } from '@/lib/dummyData';
import { ProjectProps } from './ProjectCard';

interface EditProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Keeping for backward compatibility
  imageUrls: string[]; // New field for multiple images
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

interface FormState {
  username: string;
  displayName: string;
  jobTitle: string;
  location: string;
  website: string;
  bio: string;
  status: string;
  projects: ProjectFormData[];
}

export function EditProfileOverlay({ isOpen, onClose, onSave }: EditProfileOverlayProps) {
  const [formData, setFormData] = useState<FormState>({
    username: dummyProfile.name.toLowerCase().replace(/\s+/g, '.'),
    displayName: dummyProfile.name,
    jobTitle: dummyProfile.headline,
    location: 'San Francisco, CA',
    website: 'https://example.com',
    bio: dummyProfile.bio,
    status: dummyProfile.status,
    projects: [...dummyProjects]
  });
  
  const [activeSection, setActiveSection] = useState('general');
  const [editingProject, setEditingProject] = useState<ProjectFormData | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProject) return;
    
    const { name, value } = e.target;
    setEditingProject(prev => ({
      ...prev!,
      [name]: value
    }));
  };
  
  const handleAddTag = () => {
    if (!editingProject || !newTagInput.trim()) return;
    
    setEditingProject(prev => ({
      ...prev!,
      tags: [...prev!.tags, newTagInput.trim()]
    }));
    setNewTagInput('');
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingProject) return;
    
    setEditingProject(prev => ({
      ...prev!,
      tags: prev!.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleAddProject = () => {
    setEditingProject({
      id: Date.now().toString(),
      title: '',
      description: '',
      imageUrl: '',
      imageUrls: [],
      tags: [],
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
  };
  
  const handleEditProject = (project: ProjectProps) => {
    setEditingProject({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      imageUrls: project.imageUrls || [],
      tags: project.tags || [],
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured
    });
  };
  
  const handleDeleteProject = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };
  
  const handleSaveProject = () => {
    if (!editingProject) return;
    
    setFormData((prev) => {
      const existingIndex = prev.projects.findIndex(p => p.id === editingProject.id);
      
      if (existingIndex >= 0) {
        // Update existing project
        const updatedProjects = [...prev.projects];
        updatedProjects[existingIndex] = editingProject;
        return {
          ...prev,
          projects: updatedProjects
        };
      } else {
        // Add new project
        return {
          ...prev,
          projects: [...prev.projects, editingProject]
        };
      }
    });
    
    setEditingProject(null);
  };
  
  const handleCancelEditProject = () => {
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Map the new form fields back to the expected format for the API
    const submissionData = {
      ...formData,
      name: formData.displayName,
      headline: formData.jobTitle,
      // Keep other fields as they are
    };
    onSave(submissionData);
    onClose();
  };

  // Define sidebar navigation items
  const sidebarItems = [
    { id: 'general', label: 'General', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <FileText className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <Users className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <FileText className="w-4 h-4" /> },
    { id: 'media', label: 'Media', icon: <Image className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-gray-800 shadow-xl transition-all flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 p-4 border-r border-gray-700 overflow-y-auto max-h-[80vh]">
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-100">
                      Edit Profile
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="p-1 rounded-full hover:bg-gray-700 text-gray-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${activeSection === item.id ? 'bg-gray-800 text-blue-500' : 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'}`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Main content */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[80vh]">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-100">
                      {sidebarItems.find(item => item.id === activeSection)?.label}
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form content */}
                    {activeSection === 'general' ? (
                      <>
                        <div className="space-y-2">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-600 text-gray-300 text-sm">
                              @
                            </span>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-r-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="displayName" className="block text-sm font-medium text-gray-300">
                            Display Name
                          </label>
                          <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <span>Job Title</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>Location</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="website" className="block text-sm font-medium text-gray-300">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              <span>Website</span>
                            </div>
                          </label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
                            About
                          </label>
                          <div className="border border-gray-600 rounded-md overflow-hidden">
                            <div className="flex bg-gray-800 border-b border-gray-600 p-1">
                              <button type="button" className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                              <button type="button" className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                                </svg>
                              </button>
                              <button type="button" className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 7V4h16v3"/>
                                  <path d="M9 20h6"/>
                                  <path d="M12 4v16"/>
                                </svg>
                              </button>
                              <button type="button" className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="8" y1="6" x2="21" y2="6"></line>
                                  <line x1="8" y1="12" x2="21" y2="12"></line>
                                  <line x1="8" y1="18" x2="21" y2="18"></line>
                                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                              </button>
                              <button type="button" className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                              </button>
                            </div>
                            <textarea
                              id="bio"
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              rows={6}
                              className="w-full px-3 py-2 bg-gray-700 text-gray-100 focus:outline-none focus:ring-0 border-0"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="status" className="block text-sm font-medium text-gray-300">
                            Status
                          </label>
                          <input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </button>
                        </div>
                      </>
                    ) : activeSection === 'projects' && !editingProject ? (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-gray-200 font-medium">Your Projects</h3>
                          <button
                            type="button"
                            onClick={handleAddProject}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            Add Project
                          </button>
                        </div>
                        
                        {formData.projects.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <p>You haven't added any projects yet.</p>
                            <button
                              type="button"
                              onClick={handleAddProject}
                              className="mt-2 text-blue-500 hover:text-blue-400"
                            >
                              Add your first project
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {formData.projects.map((project) => (
                              <div key={project.id} className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex justify-between">
                                  <h4 className="text-gray-200 font-medium">{project.title}</h4>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleEditProject(project)}
                                      className="text-gray-400 hover:text-gray-300"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteProject(project.id)}
                                      className="text-red-500 hover:text-red-400"
                                    >
                                      <Trash className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
                                {project.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {project.tags.map((tag) => (
                                      <span key={tag} className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="pt-4 flex justify-end">
                          <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-gray-200 font-medium">
                            {editingProject?.id ? 'Edit Project' : 'Add New Project'}
                          </h3>
                          <button
                            type="button"
                            onClick={handleCancelEditProject}
                            className="text-gray-400 hover:text-gray-300 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                              Project Title *
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={editingProject?.title || ''}
                              onChange={handleProjectChange}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                              Description *
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={editingProject?.description || ''}
                              onChange={handleProjectChange}
                              rows={3}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              Project Images (1-3)
                            </label>
                            
                            {/* Main image URL (for backward compatibility) */}
                            <div className="mb-2">
                              <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={editingProject?.imageUrl || ''}
                                onChange={handleProjectChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Main image URL"
                              />
                            </div>
                            
                            {/* Additional image URLs */}
                            <div className="space-y-2">
                              {editingProject?.imageUrls.map((url, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => {
                                      if (!editingProject) return;
                                      const newUrls = [...editingProject.imageUrls];
                                      newUrls[index] = e.target.value;
                                      setEditingProject(prev => ({
                                        ...prev!,
                                        imageUrls: newUrls
                                      }));
                                    }}
                                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Additional image URL ${index + 1}`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!editingProject) return;
                                      const newUrls = editingProject.imageUrls.filter((_, i) => i !== index);
                                      setEditingProject(prev => ({
                                        ...prev!,
                                        imageUrls: newUrls
                                      }));
                                    }}
                                    className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md text-gray-200"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              
                              {/* Add image URL button */}
                              {editingProject && editingProject.imageUrls.length < 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!editingProject) return;
                                    setEditingProject(prev => ({
                                      ...prev!,
                                      imageUrls: [...prev!.imageUrls, '']
                                    }));
                                  }}
                                  className="flex items-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-gray-200 text-sm w-full justify-center"
                                >
                                  <Plus className="w-4 h-4" />
                                  Add Another Image
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {editingProject?.tags.map((tag) => (
                                <div key={tag} className="flex items-center bg-gray-700 rounded px-2 py-1">
                                  <span className="text-sm text-gray-300">{tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-gray-400 hover:text-gray-300"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex">
                              <input
                                type="text"
                                value={newTagInput}
                                onChange={(e) => setNewTagInput(e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add a tag"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                              />
                              <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-r-md text-gray-200"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-300">
                                <div className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Live URL</span>
                                </div>
                              </label>
                              <input
                                type="text"
                                id="liveUrl"
                                name="liveUrl"
                                value={editingProject?.liveUrl || ''}
                                onChange={handleProjectChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300">
                                <div className="flex items-center gap-1">
                                  <Github className="w-3 h-3" />
                                  <span>GitHub URL</span>
                                </div>
                              </label>
                              <input
                                type="text"
                                id="githubUrl"
                                name="githubUrl"
                                value={editingProject?.githubUrl || ''}
                                onChange={handleProjectChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://github.com/username/repo"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="featured"
                              name="featured"
                              checked={editingProject?.featured || false}
                              onChange={(e) => setEditingProject(prev => ({ ...prev!, featured: e.target.checked }))}
                              className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                            />
                            <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
                              Featured project
                            </label>
                          </div>
                        </div>
                        
                        <div className="pt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={handleSaveProject}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
                          >
                            <Save className="w-4 h-4" />
                            {editingProject?.id ? 'Update Project' : 'Add Project'}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}