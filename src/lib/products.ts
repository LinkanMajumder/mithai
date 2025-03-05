import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  best_seller: boolean;
  is_new: boolean;
  stock: number;
  rating: number;
  reviews: number;
  created_at: string;
}

export async function getProducts(params: {
  category?: string;
  collection?: string;
  priceRange?: string;
  sortBy?: string;
}) {
  try {
    let query = supabase.from('products').select('*');

    // Apply filters
    if (params.category) {
      query = query.eq('category', params.category);
    }

    if (params.collection) {
      if (params.collection === 'bestsellers') {
        query = query.eq('best_seller', true);
      } else if (params.collection === 'new-arrivals') {
        query = query.eq('is_new', true);
      }
    }

    // Apply price range filter
    if (params.priceRange) {
      const [min, max] = params.priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        query = query.gte('price', min).lte('price', max);
      } else if (!isNaN(min)) {
        query = query.gte('price', min);
      }
    }

    // Apply sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
      }
    } else {
      // Default sorting
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function getFeaturedProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
}

export async function getRelatedProducts(productId: string, category: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .neq('id', productId)
      .limit(4);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
} 