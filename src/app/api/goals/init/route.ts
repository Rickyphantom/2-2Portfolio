import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Goals from '@/models/Goals';

export async function POST() {
  try {
    await connectMongoDB();

    const initialGoals = [
      {
        type: '2025',
        title: '정보처리기능사 자격증 취득',
        description:
          '연 3회 시행되는 시험으로 2025년 1회차(3월) 응시 예정. CBT 시험장에서 필기/실기 시험 진행',
        order: 0,
      },
      {
        type: '2025',
        title: '영어 실력 향상',
        description:
          '해외 보안 문서 분석 및 글로벌 보안 동향 파악을 위한 어학 능력 개발',
        order: 1,
      },
      {
        type: 'long-term',
        title: '보안 컨설팅 전문가로 성장',
        description: '기업의 보안 수준 향상을 위한 전문적인 컨설팅 서비스 제공',
        order: 0,
      },
      {
        type: 'long-term',
        title: '기업 보안 아키텍처 설계 전문성 확보',
        description: '안전하고 효율적인 보안 아키텍처 설계 및 구현 능력 개발',
        order: 1,
      },
    ];

    // 기존 데이터 삭제 후 초기 데이터 삽입
    await Goals.deleteMany({});
    await Goals.insertMany(initialGoals);

    return NextResponse.json({ message: 'Initial goals created' });
  } catch (err) {
    console.error('Failed to initialize goals:', err);
    return NextResponse.json(
      { error: 'Failed to initialize goals' },
      { status: 500 }
    );
  }
}
