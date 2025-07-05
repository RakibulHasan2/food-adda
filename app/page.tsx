'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, Clock, Users, Award } from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Delicious Food, Delivered Fresh",
      subtitle: "Experience the finest cuisine crafted with love and delivered to your doorstep",
      cta: "Order Now"
    },
    {
      image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Master the Art of Cooking",
      subtitle: "Join our Adda Academy and learn from professional chefs",
      cta: "Explore Courses"
    }
  ];

  const recentFoods = [
    {
      id: 1,
      name: "Gourmet Burger",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$12.99",
      description: "Juicy beef patty with fresh vegetables and special sauce"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$14.99",
      description: "Fresh mozzarella, tomato sauce, and basil on crispy crust"
    },
    {
      id: 3,
      name: "Chicken Biryani",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$16.99",
      description: "Aromatic basmati rice with tender chicken and spices"
    },
    {
      id: 4,
      name: "Pasta Carbonara",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$13.99",
      description: "Creamy pasta with bacon, eggs, and parmesan cheese"
    }
  ];

  const drinks = [
    {
      id: 1,
      name: "Fresh Orange Juice",
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$4.99",
      description: "Freshly squeezed orange juice with pulp"
    },
    {
      id: 2,
      name: "Iced Coffee",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$5.99",
      description: "Cold brew coffee with ice and cream"
    },
    {
      id: 3,
      name: "Mango Smoothie",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$6.99",
      description: "Tropical mango smoothie with yogurt"
    }
  ];

  const meals = [
    {
      id: 1,
      name: "Family Feast",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$49.99",
      description: "Complete meal for 4 people with main course, sides, and drinks"
    },
    {
      id: 2,
      name: "Lunch Special",
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
      price: "$18.99",
      description: "Main dish with rice, salad, and beverage"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing food quality and fast delivery! The flavors are incredible and the packaging is eco-friendly.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "The academy courses are fantastic! I learned so much about cooking techniques from professional chefs.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Best food delivery service in town! Fresh ingredients and delicious meals every time.",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-orange-600">FoodAdda</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link href="/foods" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
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

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 animate-fade-in-delay-2">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-30 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-30 transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Recent Foods Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Foods</h2>
            <p className="text-xl text-gray-600">Discover our latest culinary creations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentFoods.map((food) => (
              <div key={food.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.name}</h3>
                  <p className="text-gray-600 mb-4">{food.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">{food.price}</span>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Drinks Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Drinks</h2>
            <p className="text-xl text-gray-600">Refresh yourself with our premium beverages</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {drinks.map((drink) => (
              <div key={drink.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{drink.name}</h3>
                  <p className="text-gray-600 mb-4">{drink.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{drink.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Meals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Meals</h2>
            <p className="text-xl text-gray-600">Complete meals for every occasion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{meal.name}</h3>
                  <p className="text-gray-600 mb-4">{meal.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-green-600">{meal.price}</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real feedback from our valued customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-400 mb-4">FoodAdda</h3>
              <p className="text-gray-300 mb-4">
                Delivering delicious food and culinary education to your doorstep.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link></li>
                <li><Link href="/foods" className="text-gray-300 hover:text-orange-400 transition-colors">Foods</Link></li>
                <li><Link href="/academy" className="text-gray-300 hover:text-orange-400 transition-colors">Academy</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-gray-300">123 Food Street, City, State 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-gray-300">info@foodadda.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-gray-300">Mon-Fri: 9AM-10PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-gray-300">Sat-Sun: 10AM-11PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 FoodAdda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;