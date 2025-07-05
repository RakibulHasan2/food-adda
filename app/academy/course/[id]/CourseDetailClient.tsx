'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, Award, BookOpen, ChefHat, CheckCircle, ArrowLeft } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  description: string;
  longDescription: string;
  highlights: string[];
  curriculum: {
    week: number;
    title: string;
    topics: string[];
  }[];
  whatYouLearn: string[];
  requirements: string[];
  instructorBio: string;
  instructorImage: string;
}

export const CourseDetailClient = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (response.ok) {
          const courseData = await response.json();
          setCourse(courseData);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  const handleEnroll = () => {
    if (!course) return;
    
    setIsEnrolling(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLScXAMPLE/viewform?usp=pp_url&entry.1234567890=${encodeURIComponent(course.title)}&entry.0987654321=${encodeURIComponent(course.instructor)}&entry.1122334455=${course.price}`;
      window.open(googleFormUrl, '_blank');
      setIsEnrolling(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/academy" className="text-orange-600 hover:text-orange-700">
            Back to Academy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-orange-600">FoodAdda</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link href="/foods" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Foods
                </Link>
                <Link href="/academy" className="text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Academy
                </Link>
                <Link href="/contact" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Course Header */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-white">
                <Link href="/academy" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Academy
                </Link>
                <div className="mb-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl mb-6 max-w-3xl">{course.description}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <ChefHat className="w-5 h-5 mr-2" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Overview */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{course.longDescription}</p>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((week, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Week {week.week}: {week.title}
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        {week.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-orange-600" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                <div className="flex items-start space-x-4">
                  <Image
                    src={course.instructorImage}
                    alt={course.instructor}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.instructor}</h3>
                    <p className="text-gray-600">{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">${course.price}</div>
                  <div className="text-gray-600">One-time payment</div>
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors mb-6"
                >
                  {isEnrolling ? 'Processing...' : 'Enroll Now'}
                </button>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Course Highlights</h4>
                  <div className="space-y-2">
                    {course.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};