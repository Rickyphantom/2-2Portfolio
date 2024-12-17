import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Skills from '@/models/Skills';

// GET: 스킬 목록 조회
export async function GET() {
  try {
    await connectMongoDB();
    const skills = await Skills.find();
    return NextResponse.json(skills);
  } catch (err) {
    console.error('Failed to fetch skills:', err);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// PUT: 스킬 업데이트
export async function PUT(request: Request) {
  try {
    const { name, items } = await request.json();
    await connectMongoDB();
    await Skills.findOneAndUpdate({ name }, { items }, { upsert: true });
    return NextResponse.json({ message: 'Skills updated' });
  } catch (err) {
    console.error('Failed to update skills:', err);
    return NextResponse.json(
      { error: 'Failed to update skills' },
      { status: 500 }
    );
  }
}
