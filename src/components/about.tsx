'use client';

import React from 'react';
import Image from 'next/image';

export default function 소개() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 소개 섹션 */}
        <section className="mb-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">자기소개</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              안녕하세요! 정보보호학과에서 공부하고 있는 유선빈입니다. 보안
              컨설턴트를 목표로 정보보안과 취약점 진단에 깊은 관심을 가지고
              있으며, 현재는 모의해킹과 보안 컨설팅 역량을 키우고 있습니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              특히 웹/모바일 보안 취약점 진단과 보안 아키텍처 설계에 관심이
              많으며, 기업의 보안 수준을 향상시키는 것에 큰 흥미를 가지고
              있습니다.
            </p>
          </div>
          <div className="w-64 h-64 relative">
            <Image
              src="/hello.jpg"
              alt="Hello Illustration"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </section>

        {/* 기술 스택 섹션 */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>
          <div className="relative mb-8">
            <Image
              src="/기술.jpg"
              alt="Skills Banner"
              width={800}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 보안 평가 */}
            <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">보안 평가</h3>
                <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>웹
                  모의해킹
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  취약점 진단
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  보안 컨설팅
                </li>
              </ul>
            </div>

            {/* 보안 도구 */}
            <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <h3 className="font-semibold mb-3">보안 도구</h3>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Burp Suite
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Nmap
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Wireshark
                </li>
              </ul>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                수정
              </button>
            </div>

            {/* 개발 */}
            <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <h3 className="font-semibold mb-3">개발</h3>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>웹
                  개발
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  보안 스크립팅
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  리버스 엔지니어링
                </li>
              </ul>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                수정
              </button>
            </div>
          </div>
        </section>

        {/* 교육 섹션 */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Education & Career</h2>
          </div>
          <div className="border-l-2 border-gray-200 pl-4 space-y-6">
            <div>
              <h3 className="font-semibold">중부대학교 정보보호학과</h3>
              <p className="text-gray-600">2023년 9월 - 현재</p>
              <p className="text-gray-700 mt-2">
                - 정보보안 기초 및 모의해킹 실습 - 보안 취약점 분석 및 대응 방안
                연구 - 네트워크/시스템 보안 아키텍처 설계
              </p>
            </div>

            <div>
              <h3 className="font-semibold">정보보호병</h3>
              <p className="text-gray-600">2022년 2월 - 2023년 8월</p>
              <p className="text-gray-700 mt-2">
                - 군 정보보호체계 운영 및 관리 - 사이버 보안 모니터링 및 대응 -
                보안 정책 수립 및 적용
              </p>
            </div>

            <div>
              <h3 className="font-semibold">중부대학교 정보보호학과</h3>
              <p className="text-gray-600">2021년 3월 - 2022년 1월</p>
              <p className="text-gray-700 mt-2">
                - 정보보호 기초 이론 학습 - 프로그래밍 기초 과정 이수
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
