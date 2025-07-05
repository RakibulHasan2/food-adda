import { promises as fs } from 'fs';
import path from 'path';

// Simple file-based database for development
// In production, you would use a real database like PostgreSQL, MongoDB, etc.

const DATA_DIR = path.join(process.cwd(), 'data');

export interface FoodItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Pizza' | 'Asian' | 'Drinks' | 'Desserts' | 'Combos';
  image: string;
  price: number;
  rating: number;
  description: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
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

export interface FormSubmission {
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

export interface Admin {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Generic file operations
async function readJsonFile<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Food Items
export async function getFoodItems(): Promise<FoodItem[]> {
  return readJsonFile<FoodItem>('foods.json');
}

export async function getFoodItem(id: string): Promise<FoodItem | null> {
  const foods = await getFoodItems();
  return foods.find(food => food.id === id) || null;
}

export async function createFoodItem(food: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<FoodItem> {
  const foods = await getFoodItems();
  const newFood: FoodItem = {
    ...food,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  foods.push(newFood);
  await writeJsonFile('foods.json', foods);
  return newFood;
}

export async function updateFoodItem(id: string, updates: Partial<Omit<FoodItem, 'id' | 'createdAt'>>): Promise<FoodItem | null> {
  const foods = await getFoodItems();
  const index = foods.findIndex(food => food.id === id);
  if (index === -1) return null;
  
  foods[index] = {
    ...foods[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonFile('foods.json', foods);
  return foods[index];
}

export async function deleteFoodItem(id: string): Promise<boolean> {
  const foods = await getFoodItems();
  const filteredFoods = foods.filter(food => food.id !== id);
  if (filteredFoods.length === foods.length) return false;
  await writeJsonFile('foods.json', filteredFoods);
  return true;
}

// Courses
export async function getCourses(): Promise<Course[]> {
  return readJsonFile<Course>('courses.json');
}

export async function getCourse(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find(course => course.id === id) || null;
}

export async function createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
  const courses = await getCourses();
  const newCourse: Course = {
    ...course,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  courses.push(newCourse);
  await writeJsonFile('courses.json', courses);
  return newCourse;
}

export async function updateCourse(id: string, updates: Partial<Omit<Course, 'id' | 'createdAt'>>): Promise<Course | null> {
  const courses = await getCourses();
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) return null;
  
  courses[index] = {
    ...courses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonFile('courses.json', courses);
  return courses[index];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const courses = await getCourses();
  const filteredCourses = courses.filter(course => course.id !== id);
  if (filteredCourses.length === courses.length) return false;
  await writeJsonFile('courses.json', filteredCourses);
  return true;
}

// Form Submissions
export async function getFormSubmissions(): Promise<FormSubmission[]> {
  return readJsonFile<FormSubmission>('submissions.json');
}

export async function createFormSubmission(submission: Omit<FormSubmission, 'id' | 'submittedAt'>): Promise<FormSubmission> {
  const submissions = await getFormSubmissions();
  const newSubmission: FormSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  await writeJsonFile('submissions.json', submissions);
  return newSubmission;
}

// Admins
export async function getAdmins(): Promise<Admin[]> {
  return readJsonFile<Admin>('admins.json');
}

export async function getAdminByUsername(username: string): Promise<Admin | null> {
  const admins = await getAdmins();
  return admins.find(admin => admin.username === username) || null;
}

export async function createAdmin(admin: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
  const admins = await getAdmins();
  const newAdmin: Admin = {
    ...admin,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  admins.push(newAdmin);
  await writeJsonFile('admins.json', admins);
  return newAdmin;
}

// Initialize default data
export async function initializeDefaultData() {
  const foods = await getFoodItems();
  const courses = await getCourses();
  const admins = await getAdmins();

  // Initialize default foods if empty
  if (foods.length === 0) {
    const defaultFoods: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: "Classic Burger",
        category: "Burgers",
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
        price: 12.99,
        rating: 4.8,
        description: "Juicy beef patty with lettuce, tomato, cheese, and our special sauce",
        ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Special Sauce"]
      },
      {
        name: "Margherita Pizza",
        category: "Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
        price: 14.99,
        rating: 4.9,
        description: "Fresh mozzarella, tomato sauce, and basil on crispy thin crust",
        ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Olive Oil"]
      },
      {
        name: "Chicken Biryani",
        category: "Asian",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
        price: 16.99,
        rating: 4.7,
        description: "Aromatic basmati rice with tender chicken and traditional spices",
        ingredients: ["Basmati Rice", "Chicken", "Saffron", "Spices", "Yogurt"]
      }
    ];

    for (const food of defaultFoods) {
      await createFoodItem(food);
    }
  }

  // Initialize default courses if empty
  if (courses.length === 0) {
    const defaultCourse: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> = {
      title: "Basic Cooking Fundamentals",
      instructor: "Chef Maria Rodriguez",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 1247,
      price: 299,
      image: "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      description: "Master the essential cooking techniques, knife skills, and fundamental recipes that every home cook should know.",
      longDescription: "This foundational course is perfect for beginners who want to build a strong base in cooking. You'll learn proper knife techniques, understanding of ingredients, basic cooking methods, and essential recipes that form the backbone of great cooking.",
      highlights: ["Professional knife skills", "Basic cooking techniques", "Essential recipes", "Food safety", "Kitchen organization", "Ingredient knowledge"],
      curriculum: [
        {
          week: 1,
          title: "Kitchen Setup & Knife Skills",
          topics: ["Kitchen organization", "Knife types and uses", "Basic cutting techniques", "Safety protocols"]
        },
        {
          week: 2,
          title: "Cooking Methods & Heat Control",
          topics: ["Sautéing", "Roasting", "Braising", "Understanding heat levels"]
        }
      ],
      whatYouLearn: [
        "Professional knife skills and safety",
        "Essential cooking techniques and methods",
        "How to build flavors and season properly",
        "Understanding ingredients and their properties"
      ],
      requirements: [
        "Basic kitchen equipment (knives, cutting board, pots, pans)",
        "Access to a stove and oven",
        "Willingness to practice and learn",
        "No prior cooking experience required"
      ],
      instructorBio: "Chef Maria Rodriguez has over 15 years of experience in professional kitchens and culinary education.",
      instructorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
    };

    await createCourse(defaultCourse);
  }

  // Initialize default admin if empty
  if (admins.length === 0) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await createAdmin({
      username: 'admin',
      email: 'admin@foodadda.com',
      passwordHash: hashedPassword
    });
  }
}