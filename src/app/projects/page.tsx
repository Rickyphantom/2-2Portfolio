'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  custom_description?: string;
  image_url?: string;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(
          'https://api.github.com/users/Rickyphantom/repos'
        );
        const data = await response.json();
        setRepos(
          data.map((repo: Repository) => ({
            ...repo,
            image_url: '/net.png',
          }))
        );
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (repo: Repository) => {
    setEditingId(repo.id);
    setEditText(repo.custom_description || '');
    setImagePreview(repo.image_url || '');
  };

  const handleSave = (repo: Repository) => {
    setRepos(
      repos.map((r) =>
        r.id === repo.id
          ? {
              ...r,
              custom_description: editText,
              image_url: imagePreview || r.image_url,
            }
          : r
      )
    );
    setEditingId(null);
    setImagePreview('');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          <p className="text-lg">로딩중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {repos.map((repo) => (
          <div key={repo.id} className="border border-gray-200 p-4 rounded-lg">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 relative aspect-video overflow-hidden"
            >
              <Image
                src={
                  editingId === repo.id
                    ? imagePreview || repo.image_url || '/net.png'
                    : repo.image_url || '/net.png'
                }
                alt={repo.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
              {editingId === repo.id && (
                <label className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-opacity-70 transition-all text-sm">
                  이미지 변경
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </a>

            <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
            <div className="flex justify-between items-start mb-4">
              {editingId === repo.id ? (
                <div className="flex-1 flex flex-col gap-4">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="프로젝트 설명을 입력하세요"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleSave(repo)}
                      className="px-4 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setImagePreview('');
                      }}
                      className="px-4 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 break-words">
                    {repo.custom_description || '설명이 없습니다.'}
                  </p>
                  <button
                    onClick={() => handleEdit(repo)}
                    className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5"
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
                </>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              {repo.language && (
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {repo.language}
                </span>
              )}
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {repo.stargazers_count}
              </span>
            </div>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/github.png"
                alt="GitHub"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
