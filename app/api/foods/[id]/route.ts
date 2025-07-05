import { NextRequest, NextResponse } from 'next/server';
import { getFoodItem, updateFoodItem, deleteFoodItem } from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const food = await getFoodItem(params.id);
    
    if (!food) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(food);
  } catch (error) {
    console.error('Error fetching food:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const auth = verifyAuthToken(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updates = await request.json();
    const updatedFood = await updateFoodItem(params.id, updates);
    
    if (!updatedFood) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedFood);
  } catch (error) {
    console.error('Error updating food:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const auth = verifyAuthToken(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const deleted = await deleteFoodItem(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}