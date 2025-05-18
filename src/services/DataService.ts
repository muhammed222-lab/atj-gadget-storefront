
import { Product } from '@/components/ProductCard';

// Sample data for products
export const sampleProducts: Product[] = [
  {
    id: 'p1',
    name: 'Pro Gaming Headset with Noise Cancellation',
    price: 99.99,
    originalPrice: 129.99,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FtaW5nJTIwaGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1591090820869-4c5f8dee084e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdhbWluZyUyMGhlYWRzZXR8ZW58MHx8MHx8fDA%3D'
    ],
    rating: 4.7,
    reviewCount: 128,
    colors: ['#000000', '#FF0000', '#0000FF'],
    brand: 'AudioTech',
    category: 'Headsets',
    tags: ['gaming', 'audio', 'wireless'],
    featured: true,
    inStock: true
  },
  {
    id: 'p2',
    name: '10" LED Ring Light with Tripod Stand',
    price: 39.99,
    originalPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1603574670812-d24560880210?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmluZyUyMGxpZ2h0fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1595188325542-d66948195be6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpbmclMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D'
    ],
    rating: 4.5,
    reviewCount: 97,
    colors: ['#000000', '#FFFFFF'],
    brand: 'LumiPro',
    category: 'Ring Lights',
    tags: ['streaming', 'photography', 'lighting'],
    featured: true,
    inStock: true
  },
  {
    id: 'p3',
    name: '4K Webcam with Auto Focus',
    price: 79.99,
    originalPrice: 89.99,
    images: [
      'https://images.unsplash.com/photo-1649859394657-8762d8a4c31c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdlYmNhbXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYmNhbXxlbnwwfHwwfHx8MA%3D%3D'
    ],
    rating: 4.6,
    reviewCount: 72,
    colors: ['#000000'],
    brand: 'ViewMax',
    category: 'Cameras',
    tags: ['streaming', 'video', 'conferencing'],
    featured: false,
    inStock: true
  },
  {
    id: 'p4',
    name: 'Ergonomic Wireless Gaming Mouse',
    price: 49.99,
    originalPrice: 69.99,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1627831759945-45fdb1b52abf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D'
    ],
    rating: 4.8,
    reviewCount: 203,
    colors: ['#000000', '#FFFFFF', '#FF0000'],
    brand: 'GamerGear',
    category: 'Mice',
    tags: ['gaming', 'wireless', 'ergonomic'],
    featured: true,
    inStock: true
  },
  {
    id: 'p5',
    name: 'Smart Home Tool Kit - 25 Pieces',
    price: 69.99,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9vbCUyMGtpdHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9vbCUyMGtpdHxlbnwwfHwwfHx8MA%3D%3D'
    ],
    rating: 4.3,
    reviewCount: 45,
    colors: [],
    brand: 'ToolMaster',
    category: 'Home Tools',
    tags: ['tools', 'home', 'DIY'],
    featured: false,
    inStock: true
  },
  {
    id: 'p6',
    name: 'Bluetooth Sports Headphones',
    price: 59.99,
    originalPrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpcmVsZXNzJTIwaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdpcmVsZXNzJTIwaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
    ],
    rating: 4.4,
    reviewCount: 89,
    colors: ['#000000', '#FF0000', '#FFFFFF', '#00FF00'],
    brand: 'SoundSport',
    category: 'Headsets',
    tags: ['sports', 'audio', 'wireless'],
    featured: false,
    inStock: true
  },
  {
    id: 'p7',
    name: '18" LED Ring Light with Remote',
    price: 89.99,
    originalPrice: 119.99,
    images: [
      'https://images.unsplash.com/photo-1603574670812-d24560880210?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmluZyUyMGxpZ2h0fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1617952236317-886e1a9e9e7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmluZyUyMGxpZ2h0fGVufDB8fDB8fHww'
    ],
    rating: 4.7,
    reviewCount: 62,
    colors: ['#000000'],
    brand: 'LumiPro',
    category: 'Ring Lights',
    tags: ['streaming', 'photography', 'professional'],
    featured: true,
    inStock: true
  },
  {
    id: 'p8',
    name: 'DSLR Camera with 18-55mm Lens',
    price: 599.99,
    originalPrice: 699.99,
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHNsciUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHNsciUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D'
    ],
    rating: 4.9,
    reviewCount: 37,
    colors: ['#000000'],
    brand: 'CapturePro',
    category: 'Cameras',
    tags: ['photography', 'professional', 'DSLR'],
    featured: true,
    inStock: true
  }
];

// Sample order data
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  color?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    country: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingId?: string;
}

export const sampleOrders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2023-05-15T10:30:00Z',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, New York, NY 10001',
      country: 'United States'
    },
    items: [
      {
        productId: 'p1',
        productName: 'Pro Gaming Headset with Noise Cancellation',
        quantity: 1,
        price: 99.99,
        color: '#000000'
      },
      {
        productId: 'p4',
        productName: 'Ergonomic Wireless Gaming Mouse',
        quantity: 1,
        price: 49.99,
        color: '#FF0000'
      }
    ],
    totalAmount: 149.98,
    status: 'delivered',
    trackingId: 'TRK-7890123'
  },
  {
    id: 'ORD-12346',
    date: '2023-05-20T14:45:00Z',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 Park Ave, Los Angeles, CA 90001',
      country: 'United States'
    },
    items: [
      {
        productId: 'p2',
        productName: '10" LED Ring Light with Tripod Stand',
        quantity: 1,
        price: 39.99
      }
    ],
    totalAmount: 39.99,
    status: 'shipped',
    trackingId: 'TRK-7890124'
  },
  {
    id: 'ORD-12347',
    date: '2023-05-25T09:15:00Z',
    customer: {
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      address: '789 Oak St, Chicago, IL 60007',
      country: 'United States'
    },
    items: [
      {
        productId: 'p8',
        productName: 'DSLR Camera with 18-55mm Lens',
        quantity: 1,
        price: 599.99
      }
    ],
    totalAmount: 599.99,
    status: 'processing'
  }
];

// Reviews data
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const sampleReviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'GamerPro123',
    rating: 5,
    comment: 'Best gaming headset I\'ve ever used. The noise cancellation is perfect for intense gaming sessions.',
    date: '2023-04-10T15:30:00Z'
  },
  {
    id: 'r2',
    productId: 'p1',
    userId: 'u2',
    userName: 'AudioEnthusiast',
    rating: 4,
    comment: 'Great sound quality, but could be more comfortable for long sessions.',
    date: '2023-04-15T09:45:00Z'
  },
  {
    id: 'r3',
    productId: 'p2',
    userId: 'u3',
    userName: 'StreamerJane',
    rating: 5,
    comment: 'Perfect lighting for my streams! Easy to set up and adjust.',
    date: '2023-04-18T14:20:00Z'
  },
  {
    id: 'r4',
    productId: 'p8',
    userId: 'u4',
    userName: 'PhotoHobbyist',
    rating: 5,
    comment: 'Amazing camera for beginners. The quality is outstanding for the price.',
    date: '2023-04-20T11:10:00Z'
  }
];

// Service functions

// Function to get all products
export const getAllProducts = (): Promise<Product[]> => {
  return Promise.resolve(sampleProducts);
};

// Function to get product by ID
export const getProductById = (id: string): Promise<Product | undefined> => {
  const product = sampleProducts.find(p => p.id === id);
  return Promise.resolve(product);
};

// Function to get products by category
export const getProductsByCategory = (category: string): Promise<Product[]> => {
  const products = sampleProducts.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  return Promise.resolve(products);
};

// Function to get featured products
export const getFeaturedProducts = (): Promise<Product[]> => {
  const products = sampleProducts.filter(p => p.featured);
  return Promise.resolve(products);
};

// Function to get product reviews
export const getProductReviews = (productId: string): Promise<Review[]> => {
  const reviews = sampleReviews.filter(r => r.productId === productId);
  return Promise.resolve(reviews);
};

// Function to add product review
export const addProductReview = (review: Omit<Review, 'id'>): Promise<Review> => {
  const newReview: Review = {
    ...review,
    id: `r${sampleReviews.length + 1}`
  };
  sampleReviews.push(newReview);
  return Promise.resolve(newReview);
};

// Function to get order by ID
export const getOrderById = (id: string): Promise<Order | undefined> => {
  const order = sampleOrders.find(o => o.id === id);
  return Promise.resolve(order);
};

// Function to place an order
export const placeOrder = (order: Omit<Order, 'id' | 'status'>): Promise<Order> => {
  // Generate a random order ID
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const newOrder: Order = {
    ...order,
    id: orderId,
    status: 'pending'
  };
  
  sampleOrders.push(newOrder);
  return Promise.resolve(newOrder);
};

// Admin functions

// Function to add a product
export const addProduct = (product: Omit<Product, 'id'>): Promise<Product> => {
  const newId = `p${sampleProducts.length + 1}`;
  const newProduct: Product = { ...product, id: newId };
  sampleProducts.push(newProduct);
  return Promise.resolve(newProduct);
};

// Function to update a product
export const updateProduct = (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
  const index = sampleProducts.findIndex(p => p.id === id);
  if (index === -1) return Promise.resolve(undefined);
  
  sampleProducts[index] = { ...sampleProducts[index], ...updates };
  return Promise.resolve(sampleProducts[index]);
};

// Function to delete a product
export const deleteProduct = (id: string): Promise<boolean> => {
  const index = sampleProducts.findIndex(p => p.id === id);
  if (index === -1) return Promise.resolve(false);
  
  sampleProducts.splice(index, 1);
  return Promise.resolve(true);
};

// Function to get all orders
export const getAllOrders = (): Promise<Order[]> => {
  return Promise.resolve(sampleOrders);
};

// Function to update order status
export const updateOrderStatus = (id: string, status: Order['status']): Promise<Order | undefined> => {
  const index = sampleOrders.findIndex(o => o.id === id);
  if (index === -1) return Promise.resolve(undefined);
  
  sampleOrders[index].status = status;
  return Promise.resolve(sampleOrders[index]);
};

// Function to filter products
export const filterProducts = (
  filters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    colors?: string[];
  }
): Promise<Product[]> => {
  let filteredProducts = [...sampleProducts];
  
  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }
  
  if (filters.brand) {
    filteredProducts = filteredProducts.filter(p => 
      p.brand.toLowerCase() === filters.brand?.toLowerCase()
    );
  }
  
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
  }
  
  if (filters.minRating !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating!);
  }
  
  if (filters.colors && filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      p.colors?.some(color => filters.colors?.includes(color))
    );
  }
  
  return Promise.resolve(filteredProducts);
};
