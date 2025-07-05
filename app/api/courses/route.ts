import { NextRequest, NextResponse } from 'next/server';
import { getCourses, createCourse } from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function GET() {
  try {
    const courses = await getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
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

    const courseData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'instructor', 'duration', 'level', 'price', 'description'];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const newCourse = await createCourse({
      ...courseData,
      rating: courseData.rating || 4.5,
      students: courseData.students || 0,
      highlights: courseData.highlights || [],
      curriculum: courseData.curriculum || [],
      whatYouLearn: courseData.whatYouLearn || [],
      requirements: courseData.requirements || [],
      instructorBio: courseData.instructorBio || '',
      instructorImage: courseData.instructorImage || ''
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}