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

    const updateData: {
      name: string;
      custom_description: string;
      image_url?: string;
    } = {
      name,
      custom_description,
    };

    if (image_url) {
      updateData.image_url = image_url;
    }

    await Project.findOneAndUpdate({ id }, updateData, { upsert: true });

    return NextResponse.json({ message: 'Project updated' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
