import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Goals from '@/models/Goals';

export async function GET() {
  try {
    await connectMongoDB();
    const goals = await Goals.find().sort('order');
    return NextResponse.json(goals);
  } catch (err) {
    console.error('Failed to fetch goals:', err);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { type, title, description } = await request.json();
    await connectMongoDB();
    const lastGoal = await Goals.findOne({ type }).sort('-order');
    const order = lastGoal ? lastGoal.order + 1 : 0;
    await Goals.create({ type, title, description, order });
    return NextResponse.json({ message: 'Goal created' });
  } catch (err) {
    console.error('Failed to create goal:', err);
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, description } = await request.json();
    await connectMongoDB();
    await Goals.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: 'Goal updated' });
  } catch (err) {
    console.error('Failed to update goal:', err);
    return NextResponse.json(
      { error: 'Failed to update goal' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await connectMongoDB();
    await Goals.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Goal deleted' });
  } catch (err) {
    console.error('Failed to delete goal:', err);
    return NextResponse.json(
      { error: 'Failed to delete goal' },
      { status: 500 }
    );
  }
}
