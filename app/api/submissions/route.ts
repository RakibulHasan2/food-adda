import { NextRequest, NextResponse } from 'next/server';
import { getFormSubmissions, createFormSubmission } from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = verifyAuthToken(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const submissions = await getFormSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json();
    
    // Validate required fields
    const requiredFields = ['courseId', 'courseName', 'instructor', 'price', 'studentName', 'studentEmail'];
    for (const field of requiredFields) {
      if (!submissionData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const newSubmission = await createFormSubmission(submissionData);
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}