import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Projects from '@/models/Projects';

export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Projects.find();
    return NextResponse.json(projects);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, custom_description, image_url } = await request.json();
    await connectMongoDB();
    await Projects.findOneAndUpdate(
      { id },
      { custom_description, image_url },
      { upsert: true }
    );
    return NextResponse.json({ message: 'Project updated' });
  } catch (err) {
    console.error('Failed to update project:', err);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
