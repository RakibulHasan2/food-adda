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
  Star
} from 'lucide-react';
import Image from 'next/image';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

const AdminFoodsPage = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Burgers',
    image: '',
    price: 0,
    rating: 4.5,
    description: '',
    ingredients: ''
  });
  const router = useRouter();

  const categories = ['Burgers', 'Pizza', 'Asian', 'Drinks', 'Desserts', 'Combos'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchFoods();
  }, [router]);

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/foods', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFoods(data);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const foodData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i)
    };

    try {
      const url = editingFood ? `/api/foods/${editingFood.id}` : '/api/foods';
      const method = editingFood ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        await fetchFoods();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving food:', error);
    }
  };

  const handleEdit = (food: FoodItem) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      category: food.category,
      image: food.image,
      price: food.price,
      rating: food.rating,
      description: food.description,
      ingredients: food.ingredients.join(', ')
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this food item?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/foods/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchFoods();
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Burgers',
      image: '',
      price: 0,
      rating: 4.5,
      description: '',
      ingredients: ''
    });
    setEditingFood(null);
    setShowAddModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
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
              className="flex items-center px-4 py-3 text-gray-700 bg-orange-100 rounded-lg"
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Management</h1>
            <p className="text-gray-600">Manage your food items and menu</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Food Item
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search foods..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Foods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
                height={100}
                width={100}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {food.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{food.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-orange-600">${food.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{food.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(food)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
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

        {filteredFoods.length === 0 && (
          <div className="text-center py-16">
            <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No food items found</h3>
            <p className="text-gray-600">Add your first food item to get started</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingFood ? 'Edit Food Item' : 'Add New Food Item'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="Beef Patty, Lettuce, Tomato, Cheese"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {editingFood ? 'Update Food Item' : 'Add Food Item'}
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

export default AdminFoodsPage;