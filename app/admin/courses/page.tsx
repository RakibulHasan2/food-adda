'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  GraduationCap, 
  FileText, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Star,
  Users,
  Clock
} from 'lucide-react';
import Image from 'next/image';

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
  createdAt: string;
  updatedAt: string;
}

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    rating: 4.5,
    students: 0,
    price: 0,
    image: '',
    description: '',
    longDescription: '',
    highlights: '',
    whatYouLearn: '',
    requirements: '',
    instructorBio: '',
    instructorImage: ''
  });
  const router = useRouter();

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchCourses();
  }, [router]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const courseData = {
      ...formData,
      highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h),
      whatYouLearn: formData.whatYouLearn.split(',').map(w => w.trim()).filter(w => w),
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r),
      curriculum: [] // For simplicity, we'll handle curriculum separately
    };

    try {
      const url = editingCourse ? `/api/courses/${editingCourse.id}` : '/api/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        await fetchCourses();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      rating: course.rating,
      students: course.students,
      price: course.price,
      image: course.image,
      description: course.description,
      longDescription: course.longDescription,
      highlights: course.highlights.join(', '),
      whatYouLearn: course.whatYouLearn.join(', '),
      requirements: course.requirements.join(', '),
      instructorBio: course.instructorBio,
      instructorImage: course.instructorImage
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      rating: 4.5,
      students: 0,
      price: 0,
      image: '',
      description: '',
      longDescription: '',
      highlights: '',
      whatYouLearn: '',
      requirements: '',
      instructorBio: '',
      instructorImage: ''
    });
    setEditingCourse(null);
    setShowAddModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-orange-600">FoodAdda Admin</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            
            <Link
              href="/admin/foods"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <UtensilsCrossed className="w-5 h-5 mr-3" />
              Food Management
            </Link>
            
            <Link
              href="/admin/courses"
              className="flex items-center px-4 py-3 text-gray-700 bg-orange-100 rounded-lg"
            >
              <GraduationCap className="w-5 h-5 mr-3" />
              Course Management
            </Link>
            
            <Link
              href="/admin/submissions"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5 mr-3" />
              Form Submissions
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Manage your academy courses</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Course
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
                height={100}
                width={100}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {course.students} students
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-orange-600">${course.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Add your first course to get started</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 8 weeks"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level *
                  </label>
                  <select
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Highlights (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="Professional knife skills, Basic cooking techniques, Essential recipes"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What You&lsquo;ll Learn (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={formData.whatYouLearn}
                  onChange={(e) => setFormData({ ...formData, whatYouLearn: e.target.value })}
                  placeholder="Professional knife skills and safety, Essential cooking techniques and methods"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Basic kitchen equipment, Access to a stove and oven"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.instructorBio}
                    onChange={(e) => setFormData({ ...formData, instructorBio: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.instructorImage}
                    onChange={(e) => setFormData({ ...formData, instructorImage: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoursesPage;