
import { faker } from '@faker-js/faker';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  brand: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  colors?: string[];
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
}

export interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer: {
    name: string;
    email: string;
    address: string;
    country: string;
  };
  items: OrderItem[];
  totalAmount: number;
  trackingId?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  color?: string; // Added color property
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName?: string; // Add userName property
  rating: number;
  comment: string;
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  isAdmin: boolean;
}

// Generate mock data functions
const generateRandomProduct = (): Product => {
  const productName = faker.commerce.productName();
  const category = faker.commerce.department();
  const price = parseFloat(faker.commerce.price());
  const hasDiscount = faker.datatype.boolean();
  // Fix for faker.datatype.float - use faker.number.float instead
  const originalPrice = hasDiscount ? price * (1 + faker.number.float({ min: 0.1, max: 0.5 })) : undefined;
  const imageCount = faker.number.int({ min: 1, max: 4 });
  
  return {
    id: faker.string.uuid(),
    name: productName,
    description: faker.commerce.productDescription(),
    price: price,
    originalPrice: originalPrice,
    brand: faker.company.name(),
    category: category,
    inStock: faker.datatype.boolean(),
    // Fix for faker.number.float with precision - removed precision parameter
    rating: faker.number.float({ min: 1, max: 5 }),
    reviewCount: faker.number.int({ min: 0, max: 500 }),
    images: Array.from({ length: imageCount }, () => faker.image.url()),
    colors: faker.datatype.boolean() ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.color.human()) : undefined,
    features: faker.datatype.boolean() ? Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.sentence()) : undefined,
    specifications: faker.datatype.boolean() ? Object.fromEntries(Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => [faker.commerce.productAdjective(), faker.lorem.words()])) : undefined,
  };
};

const generateRandomOrder = (): Order => {
  const itemCount = faker.number.int({ min: 1, max: 5 });
  const items: OrderItem[] = Array.from({ length: itemCount }, () => {
    const price = parseFloat(faker.commerce.price());
    const quantity = faker.number.int({ min: 1, max: 5 });
    return {
      productId: faker.string.uuid(),
      productName: faker.commerce.productName(),
      quantity: quantity,
      price: price,
      color: faker.datatype.boolean() ? faker.color.human() : undefined
    };
  });
  
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    id: faker.string.uuid(),
    date: faker.date.recent(),
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    customer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      country: faker.location.country(),
    },
    items: items,
    totalAmount: totalAmount,
    trackingId: faker.string.alphanumeric(10),
  };
};

const generateRandomReview = (productId: string, userId: string): Review => ({
  id: faker.string.uuid(),
  productId: productId,
  userId: userId,
  userName: faker.person.fullName(),
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.lorem.sentence(),
  date: faker.date.recent(),
});

const generateRandomUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  phone: faker.phone.number(),
  isAdmin: faker.datatype.boolean(),
});

// Generate mock data
const mockProducts: Product[] = Array.from({ length: 24 }, () => generateRandomProduct());
const mockOrders: Order[] = Array.from({ length: 10 }, () => generateRandomOrder());
const mockUsers: User[] = Array.from({ length: 5 }, () => generateRandomUser());

// API functions (mocked)
export const getAllProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockProducts;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts.slice(0, 6);
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProduct: Product = { id: faker.string.uuid(), ...product };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const productIndex = mockProducts.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...updates };
    return mockProducts[productIndex];
  }
  return undefined;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const productIndex = mockProducts.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    mockProducts.splice(productIndex, 1);
    return true;
  }
  return false;
};

export const filterProducts = async (
  category?: string,
  brands?: string[],
  priceRange?: [number, number],
  ratings?: number[]
): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockProducts.filter(product => {
    // Category filter
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    
    // Brand filter
    if (brands && brands.length > 0 && !brands.includes(product.brand)) {
      return false;
    }
    
    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    
    // Rating filter
    if (ratings && ratings.length > 0) {
      const floor = Math.floor(product.rating);
      const ratingMatch = ratings.some(r => floor === r);
      if (!ratingMatch) {
        return false;
      }
    }
    
    return true;
  });
};

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => generateRandomReview(productId, faker.string.uuid()));
};

export const addProductReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: faker.string.uuid(),
    ...review
  };
};

export const getAllOrders = async (): Promise<Order[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders;
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders.find(order => order.id === id);
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const orderIndex = mockOrders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = status;
    return mockOrders[orderIndex];
  }
  return undefined;
};

export const placeOrder = async (orderData: Partial<Order>): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newOrder: Order = {
    id: faker.string.uuid(),
    date: orderData.date || new Date(),
    status: 'pending',
    customer: orderData.customer || {
      name: '',
      email: '',
      address: '',
      country: ''
    },
    items: orderData.items || [],
    totalAmount: orderData.totalAmount || 0,
    trackingId: faker.string.alphanumeric(10)
  };
  mockOrders.unshift(newOrder);
  return newOrder;
};

export const getAllUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUsers;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUsers.find(user => user.id === id);
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  return createProduct(product);
};
