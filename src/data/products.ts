export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  bestSeller: boolean;
  new: boolean;
  stock: number;
  rating: number;
  reviews: number;
  ingredients?: string[];
  allergens?: string[];
  weight?: string;
  dimensions?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Chocolate Truffle Box',
    description: 'A luxurious assortment of handcrafted chocolate truffles with various fillings including caramel, hazelnut, and raspberry.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1549007994-cb8bed85524c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'chocolates',
    featured: true,
    bestSeller: true,
    new: false,
    stock: 25,
    rating: 4.8,
    reviews: 124,
    ingredients: ['Dark chocolate', 'Milk chocolate', 'Cream', 'Butter', 'Sugar', 'Natural flavors'],
    allergens: ['Milk', 'Soy', 'May contain nuts'],
    weight: '250g',
  },
  {
    id: '2',
    name: 'Assorted Macarons',
    description: 'Delicate French macarons in a variety of flavors including vanilla, chocolate, pistachio, raspberry, and lemon.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'pastries',
    featured: true,
    bestSeller: true,
    new: false,
    stock: 30,
    rating: 4.7,
    reviews: 89,
    ingredients: ['Almond flour', 'Egg whites', 'Sugar', 'Natural flavors', 'Food coloring'],
    allergens: ['Eggs', 'Nuts'],
    weight: '180g',
  },
  {
    id: '3',
    name: 'Gourmet Caramel Apples',
    description: 'Fresh apples dipped in homemade caramel and decorated with premium chocolate and toppings.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1572383672419-ab35444a5d0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'candies',
    featured: false,
    bestSeller: false,
    new: true,
    stock: 15,
    rating: 4.5,
    reviews: 42,
    ingredients: ['Apples', 'Sugar', 'Cream', 'Butter', 'Vanilla extract', 'Chocolate', 'Various toppings'],
    allergens: ['Milk', 'May contain nuts'],
    weight: '200g each',
  },
  {
    id: '4',
    name: 'Luxury Gift Hamper',
    description: 'An elegant gift box containing an assortment of our finest chocolates, cookies, and confections.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1548043518-a548b4817341?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'gift-boxes',
    featured: true,
    bestSeller: false,
    new: false,
    stock: 10,
    rating: 4.9,
    reviews: 56,
    allergens: ['Milk', 'Eggs', 'Wheat', 'Soy', 'Nuts'],
    dimensions: '30cm x 20cm x 10cm',
  },
  {
    id: '5',
    name: 'Artisan Fudge Selection',
    description: 'Handcrafted fudge in various flavors including chocolate, vanilla, peanut butter, and maple.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1575377427642-087fc673ab03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'candies',
    featured: false,
    bestSeller: true,
    new: false,
    stock: 20,
    rating: 4.6,
    reviews: 78,
    ingredients: ['Sugar', 'Butter', 'Cream', 'Natural flavors', 'Chocolate'],
    allergens: ['Milk', 'Soy', 'May contain nuts'],
    weight: '300g',
  },
  {
    id: '6',
    name: 'Classic Chocolate Chip Cookies',
    description: 'Traditional homestyle cookies with generous chunks of premium chocolate.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'pastries',
    featured: false,
    bestSeller: true,
    new: false,
    stock: 35,
    rating: 4.7,
    reviews: 112,
    ingredients: ['Flour', 'Butter', 'Sugar', 'Brown sugar', 'Eggs', 'Vanilla extract', 'Chocolate chips'],
    allergens: ['Wheat', 'Eggs', 'Milk', 'Soy'],
    weight: '250g',
  },
  {
    id: '7',
    name: 'Seasonal Berry Tarts',
    description: 'Buttery pastry shells filled with vanilla custard and topped with fresh seasonal berries.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'pastries',
    featured: true,
    bestSeller: false,
    new: true,
    stock: 12,
    rating: 4.8,
    reviews: 34,
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla', 'Milk', 'Seasonal berries'],
    allergens: ['Wheat', 'Eggs', 'Milk'],
    weight: '180g each',
  },
  {
    id: '8',
    name: 'Gourmet Marshmallows',
    description: 'Fluffy, handcrafted marshmallows in flavors like vanilla, strawberry, and chocolate.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'candies',
    featured: false,
    bestSeller: false,
    new: true,
    stock: 40,
    rating: 4.5,
    reviews: 28,
    ingredients: ['Sugar', 'Corn syrup', 'Gelatin', 'Natural flavors', 'Food coloring'],
    allergens: ['May contain traces of nuts'],
    weight: '150g',
  },
  {
    id: '9',
    name: 'Holiday Special Gift Box',
    description: 'A festive collection of seasonal treats including spiced cookies, peppermint bark, and hot chocolate bombs.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1607920592519-bab2a80efd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'seasonal',
    featured: true,
    bestSeller: false,
    new: true,
    stock: 15,
    rating: 4.9,
    reviews: 23,
    allergens: ['Wheat', 'Milk', 'Soy', 'May contain nuts'],
    dimensions: '25cm x 25cm x 8cm',
  },
  {
    id: '10',
    name: 'Premium Dark Chocolate Bar',
    description: '72% cocoa dark chocolate bar made from single-origin beans with notes of cherry and vanilla.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'chocolates',
    featured: false,
    bestSeller: false,
    new: false,
    stock: 50,
    rating: 4.7,
    reviews: 67,
    ingredients: ['Cocoa mass', 'Cocoa butter', 'Sugar', 'Vanilla extract'],
    allergens: ['May contain traces of milk, nuts, and soy'],
    weight: '100g',
  },
  {
    id: '11',
    name: 'Assorted Cake Pops',
    description: 'Bite-sized cake pops in various flavors, hand-dipped in chocolate and decorated with sprinkles.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'pastries',
    featured: false,
    bestSeller: true,
    new: false,
    stock: 25,
    rating: 4.6,
    reviews: 45,
    ingredients: ['Cake', 'Frosting', 'Chocolate coating', 'Decorative toppings'],
    allergens: ['Wheat', 'Eggs', 'Milk', 'Soy', 'May contain nuts'],
    weight: '300g (12 pieces)',
  },
  {
    id: '12',
    name: 'Artisan Honey Caramels',
    description: 'Soft caramels made with local wildflower honey and finished with sea salt.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1582058688995-b8a87a1876a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'candies',
    featured: false,
    bestSeller: false,
    new: false,
    stock: 30,
    rating: 4.8,
    reviews: 39,
    ingredients: ['Sugar', 'Cream', 'Butter', 'Honey', 'Sea salt'],
    allergens: ['Milk'],
    weight: '200g',
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
};