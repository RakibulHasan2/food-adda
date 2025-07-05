'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, Award, BookOpen, ChefHat } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  description: string;
  highlights: string[];
}

const AcademyPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const teacherFeedback = [
    {
      id: 1,
      name: "Chef Maria Rodriguez",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      message: "Teaching at FoodAdda Academy has been an incredible journey. The students are passionate and eager to learn, making every class a joy to conduct.",
      specialty: "Italian & Mediterranean Cuisine",
      experience: "15 years"
    },
    {
      id: 2,
      name: "Chef David Chen",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      message: "The academy provides excellent facilities and resources. I love seeing students transform from beginners to confident bakers.",
      specialty: "Pastry & Baking",
      experience: "12 years"
    },
    {
      id: 3,
      name: "Chef Akiko Tanaka",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      message: "The diversity of students and their enthusiasm for learning Asian cooking techniques is truly inspiring. Each class brings new energy.",
      specialty: "Asian Fusion",
      experience: "18 years"
    }
  ];

  const studentFeedback = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      course: "Basic Cooking Fundamentals",
      message: "This course completely transformed my cooking skills. I went from burning water to preparing restaurant-quality meals for my family!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Thompson",
      image: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      course: "Professional Baking & Pastry",
      message: "The hands-on approach and expert guidance helped me start my own bakery. The techniques I learned are invaluable.",
      rating: 5
    },
    {
      id: 3,
      name: "Lisa Wang",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      course: "Asian Cuisine Mastery",
      message: "As someone with Asian heritage, this course helped me connect with my roots and learn authentic techniques from my grandmother's era.",
      rating: 5
    }
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading academy courses...</p>
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
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=400&dpr=1"
            alt="Cooking Academy"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Adda Academy</h1>
              <p className="text-xl md:text-2xl mb-8">Master the culinary arts with professional chefs</p>
              <div className="flex justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>5000+ Students</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  <span>Expert Instructors</span>
                </div>
                <div className="flex items-center">
                  <ChefHat className="w-5 h-5 mr-2" />
                  <span>Professional Techniques</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h2>
              <p className="text-xl text-gray-600">Learn from the best chefs in the industry</p>
            </div>
            
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      
                      {course.highlights && course.highlights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Course Highlights:</h4>
                          <div className="flex flex-wrap gap-1">
                            {course.highlights.map((highlight, index) => (
                              <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Instructor:</strong> {course.instructor}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-orange-600">${course.price}</span>
                        <Link
                          href={`/academy/course/${course.id}`}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses available</h3>
                <p className="text-gray-600">Check back soon for exciting new courses!</p>
              </div>
            )}
          </div>
        </section>

        {/* Teacher Feedback Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-100 to-red-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Instructors</h2>
              <p className="text-xl text-gray-600">Learn from industry experts with years of experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teacherFeedback.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      width={80}
                      height={80}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{teacher.name}</h4>
                      <p className="text-orange-600 text-sm font-medium">{teacher.specialty}</p>
                      <p className="text-gray-500 text-sm">{teacher.experience} experience</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{teacher.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Feedback Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
              <p className="text-xl text-gray-600">Hear from our graduates who've transformed their culinary skills</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {studentFeedback.map((student) => (
                <div key={student.id} className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Image
                      src={student.image}
                      alt={student.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-orange-600 text-sm">{student.course}</p>
                      <div className="flex">
                        {[...Array(student.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{student.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Culinary Journey?</h2>
            <p className="text-xl mb-8">Join thousands of students who have transformed their cooking skills with our expert-led courses</p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/foods"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Menu
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcademyPage;