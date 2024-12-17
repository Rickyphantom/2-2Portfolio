'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SkillsType {
  [key: string]: string[];
}

export default function 소개() {
  const [skills, setSkills] = useState<SkillsType>({
    '보안 평가': ['웹 모의해킹', '취약점 진단', '보안 컨설팅'],
    '보안 도구': ['Burp Suite', 'Nmap', 'Wireshark'],
    개발: ['웹 개발', '보안 스크립팅', '리버스 엔지니어링'],
  });
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [editSkills, setEditSkills] = useState<string[]>([]);

  const handleEditSkill = (skillName: string, currentSkills: string[]) => {
    setEditingSkill(skillName);
    setEditSkills([...currentSkills]);
  };

  const handleSaveSkill = (skillName: string) => {
    setSkills({
      ...skills,
      [skillName]: editSkills,
    });
    setEditingSkill(null);
  };

  const handleCancelEdit = () => {
    setEditingSkill(null);
    setEditSkills([]);
  };

  const renderSkillCard = (name: string, color: string) => (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{name}</h3>
        <button
          onClick={() => handleEditSkill(name, skills[name])}
          className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
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
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>
      {editingSkill === name ? (
        <div className="space-y-2">
          {editSkills.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => {
                const newSkills = [...editSkills];
                newSkills[index] = e.target.value;
                setEditSkills(newSkills);
              }}
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
          ))}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleSaveSkill(name)}
              className="px-3 py-1 bg-black text-white rounded text-sm"
            >
              저장
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <ul className="space-y-2 text-gray-600">
          {skills[name].map((skill, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className={`w-2 h-2 bg-${color}-500 rounded-full`}></span>
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

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
            {renderSkillCard('보안 평가', 'blue')}
            {renderSkillCard('보안 도구', 'green')}
            {renderSkillCard('개발', 'purple')}
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
