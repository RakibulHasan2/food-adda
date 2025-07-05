import { NextRequest, NextResponse } from 'next/server';
import { getFoodItems, createFoodItem } from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function GET() {
  try {
    const foods = await getFoodItems();
    return NextResponse.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = verifyAuthToken(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const foodData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'image', 'price', 'description'];
    for (const field of requiredFields) {
      if (!foodData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const newFood = await createFoodItem({
      ...foodData,
      rating: foodData.rating || 4.5,
      ingredients: foodData.ingredients || []
    });

    return NextResponse.json(newFood, { status: 201 });
  } catch (error) {
    console.error('Error creating food:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}