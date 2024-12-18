'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

interface Project {
  id: number;
  name: string;
  description: string;
  github_url: string;
  vercel_url?: string;
  custom_description?: string;
  image_url?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showQR, setShowQR] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');

  const fetchProjects = async () => {
    try {
      const githubResponse = await fetch(
        'https://api.github.com/users/Rickyphantom/repos'
      );
      const githubData = await githubResponse.json();
      const mongoResponse = await fetch('/api/projects');
      const mongoData = await mongoResponse.json();

      const formattedProjects = githubData.map((project: Project) => ({
        ...project,
      }));

      const finalProjects = formattedProjects.map((project: Project) => {
        const savedData = mongoData.find((p: Project) => p.id === project.id);
        return savedData 
          ? { ...project, ...savedData }
          : { ...project, image_url: '/net.png' };
      });

      setProjects(finalProjects);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditName(project.name);
    setEditDescription(project.custom_description || project.description);
    setEditImageUrl(project.image_url || '/net.png');
  };

  const handleSave = async (id: number) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: editName,
          custom_description: editDescription,
          image_url: editImageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.url) {
          setEditImageUrl(data.url);
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white">
          프로젝트
        </h1>
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6 
                hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {project.image_url && (
                  <div className="w-full md:w-1/3 relative aspect-video">
                    <Image
                      src={project.image_url}
                      alt={project.name}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    {editingId === project.id ? (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-gray-300 mb-2"
                        />
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 mb-2 bg-gray-700 border border-gray-600 rounded text-white"
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-3 py-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSave(project.id)}
                            className="px-4 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-500"
                          >
                            저장
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-4 py-1.5 border border-gray-600 text-gray-300 rounded hover:bg-gray-700"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-bold mb-4 text-white">
                          {project.name}
                          <button
                            onClick={() => handleEdit(project)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </h2>
                        <p className="text-gray-300 mb-4">
                          {project.custom_description || project.description}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        setShowQR(showQR === project.id ? null : project.id)
                      }
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            showQR === project.id
                              ? 'M20 12H4'
                              : 'M12 4v16m8-8H4'
                          }
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                    {project.vercel_url && (
                      <a
                        href={project.vercel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Vercel Deployment"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M24 22.525H0l12-21.05 12 21.05z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                {showQR === project.id && (
                  <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg">
                    <QRCodeSVG
                      value={`https://github.com/Rickyphantom/${project.name}`}
                      size={128}
                      level="H"
                      includeMargin
                    />
                    <span className="text-sm text-gray-600">
                      GitHub QR Code
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
