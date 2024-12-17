import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Skills from '@/models/Skills';

// POST: 초기 스킬 데이터 생성
export async function POST() {
  try {
    await connectMongoDB();

    const initialSkills = [
      {
        name: '보안 평가',
        items: ['웹 모의해킹', '취약점 진단', '보안 컨설팅'],
      },
      {
        name: '보안 도구',
        items: ['Burp Suite', 'Nmap', 'Wireshark'],
      },
      {
        name: '개발',
        items: ['웹 개발', '보안 스크립팅', '리버스 엔지니어링'],
      },
    ];

    // 기존 데이터 삭제 후 초기 데이터 삽입
    await Skills.deleteMany({});
    await Skills.insertMany(initialSkills);

    return NextResponse.json({ message: 'Initial skills data created' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to initialize skills' },
      { status: 500 }
    );
  }
}
