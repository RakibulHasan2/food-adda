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
  Users,
  TrendingUp,
  DollarSign,
  Star
} from 'lucide-react';

interface DashboardStats {
  totalFoods: number;
  totalCourses: number;
  totalSubmissions: number;
  totalRevenue: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFoods: 0,
    totalCourses: 0,
    totalSubmissions: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchDashboardStats();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [foodsRes, coursesRes, submissionsRes] = await Promise.all([
        fetch('/api/foods', { headers }),
        fetch('/api/courses', { headers }),
        fetch('/api/submissions', { headers })
      ]);

      const foods = await foodsRes.json();
      const courses = await coursesRes.json();
      const submissions = await submissionsRes.json();

      const totalRevenue = submissions.reduce((sum: number, sub: any) => sum + sub.price, 0);

      setStats({
        totalFoods: foods.length,
        totalCourses: courses.length,
        totalSubmissions: submissions.length,
        totalRevenue
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

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
              className="flex items-center px-4 py-3 text-gray-700 bg-orange-100 rounded-lg"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to the FoodAdda admin panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Foods</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalFoods}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <UtensilsCrossed className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrollments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/admin/foods"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
              >
                Add New Food Item
              </Link>
              <Link
                href="/admin/courses"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
              >
                Add New Course
              </Link>
              <Link
                href="/admin/submissions"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
              >
                View Submissions
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• New course enrollment received</p>
              <p>• Food item updated successfully</p>
              <p>• New admin login detected</p>
              <p>• Database backup completed</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API</span>
                <span className="text-sm text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm text-green-600 font-medium">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;