import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, custom_description, image_url } = await request.json();
    await connectMongoDB();

    await Project.findOneAndUpdate({ id }, { image_url }, { upsert: true });

    return NextResponse.json({ message: 'Project updated' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
