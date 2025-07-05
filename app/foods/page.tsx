'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';

const FoodsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Burgers', 'Pizza', 'Asian', 'Drinks', 'Desserts', 'Combos'];

  const allItems = [
    {
      id: 1,
      name: "Classic Burger",
      category: "Burgers",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 12.99,
      rating: 4.8,
      description: "Juicy beef patty with lettuce, tomato, cheese, and our special sauce",
      ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Special Sauce"]
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Pizza",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 14.99,
      rating: 4.9,
      description: "Fresh mozzarella, tomato sauce, and basil on crispy thin crust",
      ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Olive Oil"]
    },
    {
      id: 3,
      name: "Chicken Biryani",
      category: "Asian",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 16.99,
      rating: 4.7,
      description: "Aromatic basmati rice with tender chicken and traditional spices",
      ingredients: ["Basmati Rice", "Chicken", "Saffron", "Spices", "Yogurt"]
    },
    {
      id: 4,
      name: "Pepperoni Pizza",
      category: "Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 16.99,
      rating: 4.6,
      description: "Classic pepperoni with mozzarella cheese on our signature crust",
      ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce", "Herbs"]
    },
    {
      id: 5,
      name: "Chicken Burger",
      category: "Burgers",
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 11.99,
      rating: 4.5,
      description: "Grilled chicken breast with avocado, lettuce, and mayo",
      ingredients: ["Chicken Breast", "Avocado", "Lettuce", "Mayo", "Tomato"]
    },
    {
      id: 6,
      name: "Pad Thai",
      category: "Asian",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 13.99,
      rating: 4.8,
      description: "Traditional Thai noodles with shrimp, tofu, and peanuts",
      ingredients: ["Rice Noodles", "Shrimp", "Tofu", "Peanuts", "Bean Sprouts"]
    },
    {
      id: 7,
      name: "Iced Coffee",
      category: "Drinks",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 4.99,
      rating: 4.4,
      description: "Cold brew coffee with ice and a touch of cream",
      ingredients: ["Coffee", "Ice", "Cream", "Sugar"]
    },
    {
      id: 8,
      name: "Chocolate Cake",
      category: "Desserts",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 6.99,
      rating: 4.9,
      description: "Rich chocolate cake with chocolate frosting and berries",
      ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Berries"]
    },
    {
      id: 9,
      name: "Family Combo",
      category: "Combos",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: 39.99,
      rating: 4.8,
      description: "2 pizzas, 4 drinks, and garlic bread - perfect for family dinner",
      ingredients: ["2 Pizzas", "4 Drinks", "Garlic Bread", "Dipping Sauce"]
    }
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOrder = (item: any) => {
    const message = `Hi! I'd like to order ${item.name} for $${item.price}. 

${item.description}

Please let me know the delivery details and estimated time. Thank you!`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
                <Link href="/foods" className="text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Foods
                </Link>
                <Link href="/academy" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
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
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl opacity-90">Discover delicious food delivered fresh to your door</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for food..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.ingredients.map((ingredient, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                    <button
                      onClick={() => handleOrder(item)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodsPage;