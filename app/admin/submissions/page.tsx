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
  Search,
  Download,
  Calendar,
  User,
  Mail,
  Phone,
  DollarSign
} from 'lucide-react';

interface FormSubmission {
  id: string;
  courseId: string;
  courseName: string;
  instructor: string;
  price: number;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  submittedAt: string;
}

const AdminSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchSubmissions();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Student Name', 'Email', 'Phone', 'Course', 'Instructor', 'Price', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...filteredSubmissions.map(sub => [
        sub.id,
        `"${sub.studentName}"`,
        sub.studentEmail,
        sub.studentPhone || '',
        `"${sub.courseName}"`,
        `"${sub.instructor}"`,
        sub.price,
        new Date(sub.submittedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = !filterCourse || submission.courseName === filterCourse;
    
    return matchesSearch && matchesCourse;
  });

  const uniqueCourses = [...new Set(submissions.map(sub => sub.courseName))];

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
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <GraduationCap className="w-5 h-5 mr-3" />
              Course Management
            </Link>
            
            <Link
              href="/admin/submissions"
              className="flex items-center px-4 py-3 text-gray-700 bg-orange-100 rounded-lg"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Submissions</h1>
            <p className="text-gray-600">Manage course enrollment submissions</p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Courses</option>
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900">{submissions.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Courses</p>
                <p className="text-3xl font-bold text-gray-900">{uniqueCourses.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${submissions.reduce((sum, sub) => sum + sub.price, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-900">
                  {submissions.filter(sub => {
                    const submissionDate = new Date(sub.submittedAt);
                    const now = new Date();
                    return submissionDate.getMonth() === now.getMonth() && 
                           submissionDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <User className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.studentName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {submission.studentEmail}
                          </div>
                          {submission.studentPhone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {submission.studentPhone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {submission.courseName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        ${submission.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(submission.submittedAt).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600">
                {submissions.length === 0 
                  ? "No course enrollments have been submitted yet"
                  : "Try adjusting your search or filter criteria"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissionsPage;