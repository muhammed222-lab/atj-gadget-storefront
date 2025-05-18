
import { faker } from '@faker-js/faker';

// Define types
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
  specifications?: Record<string, string>;
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
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    color?: string;
  }[];
  totalAmount: number;
  trackingId?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName?: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  isAdmin: boolean;
}

export interface FilterOptions {
  category: string;
  brand: string;
  colors: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

const generateRandomProduct = (): Product => {
  const productName = faker.commerce.productName();
  const category = faker.commerce.department();
  const price = parseFloat(faker.commerce.price());
  const hasDiscount = faker.datatype.boolean();
  const originalPrice = hasDiscount ? price * (1 + faker.number.float({
    min: 0.1,
    max: 0.5
  })) : undefined;
  const imageCount = faker.number.int({
    min: 1,
    max: 4
  });
  
  return {
    id: faker.string.uuid(),
    name: productName,
    description: faker.commerce.productDescription(),
    price: price,
    originalPrice: originalPrice,
    brand: faker.company.name(),
    category: category,
    inStock: faker.datatype.boolean(),
    rating: faker.number.float({
      min: 1,
      max: 5,
      precision: 0.1
    }),
    reviewCount: faker.number.int({
      min: 0,
      max: 500
    }),
    images: Array.from({
      length: imageCount
    }, () => faker.image.url()),
    colors: faker.datatype.boolean() ? Array.from({
      length: faker.number.int({
        min: 1,
        max: 3
      })
    }, () => faker.color.human()) : undefined,
    features: faker.datatype.boolean() ? Array.from({
      length: faker.number.int({
        min: 2,
        max: 5
      })
    }, () => faker.lorem.sentence()) : undefined,
    specifications: faker.datatype.boolean() ? Object.fromEntries(Array.from({
      length: faker.number.int({
        min: 1,
        max: 4
      })
    }, () => [
      faker.commerce.productAdjective(),
      faker.lorem.words()
    ])) : undefined
  };
};

const generateRandomOrder = (): Order => {
  const itemCount = faker.number.int({
    min: 1,
    max: 5
  });
  const items = Array.from({
    length: itemCount
  }, () => {
    const price = parseFloat(faker.commerce.price());
    const quantity = faker.number.int({
      min: 1,
      max: 5
    });
    return {
      productId: faker.string.uuid(),
      productName: faker.commerce.productName(),
      quantity: quantity,
      price: price,
      color: faker.datatype.boolean() ? faker.color.human() : undefined
    };
  });
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return {
    id: faker.string.uuid(),
    date: faker.date.recent(),
    status: faker.helpers.arrayElement([
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled'
    ]) as Order['status'],
    customer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      country: faker.location.country()
    },
    items: items,
    totalAmount: totalAmount,
    trackingId: faker.string.alphanumeric(10)
  };
};

const generateRandomReview = (productId: string, userId: string): Review => ({
  id: faker.string.uuid(),
  productId: productId,
  userId: userId,
  userName: faker.person.fullName(),
  rating: faker.number.int({
    min: 1,
    max: 5
  }),
  comment: faker.lorem.sentence(),
  date: faker.date.recent()
});

const generateRandomUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  phone: faker.phone.number(),
  isAdmin: faker.datatype.boolean()
});

// Generate mock data
const mockProducts = Array.from({
  length: 24
}, () => generateRandomProduct());

const mockOrders = Array.from({
  length: 10
}, () => generateRandomOrder());

const mockUsers = Array.from({
  length: 5
}, () => generateRandomUser());

// API functions (mocked)
export const getAllProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  return mockProducts;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts.filter((product) => product.category.toLowerCase() === categoryName.toLowerCase());
};

export const filterProducts = async (filters: FilterOptions): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return mockProducts.filter(product => {
    // Category filter
    if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    
    // Brand filter
    if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    
    // Color filter
    if (filters.colors.length > 0 && product.colors) {
      if (!product.colors.some(color => filters.colors.includes(color))) {
        return false;
      }
    }
    
    // Price filters
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    
    // Rating filter
    if (product.rating < filters.minRating) {
      return false;
    }
    
    return true;
  });
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newProduct = {
    id: faker.string.uuid(),
    ...product
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const productIndex = mockProducts.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...updates
    };
    return mockProducts[productIndex];
  }
  return undefined;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const productIndex = mockProducts.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    mockProducts.splice(productIndex, 1);
    return true;
  }
  return false;
};

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({
    length: faker.number.int({
      min: 0,
      max: 10
    })
  }, () => generateRandomReview(productId, faker.string.uuid()));
};

export const createReview = async (review: Omit<Review, "id">): Promise<Review> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newReview = {
    id: faker.string.uuid(),
    ...review
  };
  return newReview;
};

export const getAllOrders = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockOrders;
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockOrders.find((order) => order.id === id);
};

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Convert string date to Date object if needed
  let orderDate: Date;
  if (orderData.date && typeof orderData.date === 'string') {
    orderDate = new Date(orderData.date);
  } else if (orderData.date instanceof Date) {
    orderDate = orderData.date;
  } else {
    orderDate = new Date();
  }
  
  const newOrder: Order = {
    id: faker.string.uuid(),
    date: orderDate,
    status: orderData.status || 'pending',
    customer: orderData.customer || {
      name: '',
      email: '',
      address: '',
      country: ''
    },
    items: orderData.items || [],
    totalAmount: orderData.totalAmount || 0,
    trackingId: orderData.trackingId
  };
  
  mockOrders.push(newOrder);
  return newOrder;
};

export const getAllUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockUsers;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockUsers.find((user) => user.id === id);
};
