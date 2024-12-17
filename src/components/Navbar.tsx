'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed h-full top-0 left-0 z-50 bg-black text-white flex flex-col justify-between w-64 border-r border-gray-800">
      {/* 프로필 섹션 */}
      <div className="p-6">
        <Link href={'/'} className="block">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-700 mb-4">
              <Image
                src="/진짜증명사진.jpg"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">유선빈</h1>
            <p className="text-sm text-gray-400">정보보호학과 2학년</p>
          </div>
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="flex-grow p-6">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className={`px-4 py-2 rounded transition-colors ${
              pathname === '/'
                ? 'bg-gray-800 text-white font-medium'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            소개
          </Link>
          <Link
            href="/projects"
            className={`px-4 py-2 rounded transition-colors ${
              pathname === '/projects'
                ? 'bg-gray-800 text-white font-medium'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            프로젝트
          </Link>
          <Link
            href="/contact"
            className={`px-4 py-2 rounded transition-colors ${
              pathname === '/contact'
                ? 'bg-gray-800 text-white font-medium'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            연락하기
          </Link>
        </div>
      </div>

      {/* 소셜 링크 */}
      <div className="p-6 border-t border-gray-800">
        <div className="flex justify-center">
          <a
            href="https://github.com/Rickyphantom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
