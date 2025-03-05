import { createClient } from '@supabase/supabase-js';
import { products } from '../data/products';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedProductsTable() {
  try {
    console.log('Starting to seed products table...');
    console.log('Using Supabase URL:', supabaseUrl);

    // First, check if we can connect to Supabase
    const { data: tableInfo, error: tableError } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Error connecting to products table:', tableError);
      return;
    }

    console.log('Successfully connected to products table');

    // Insert mock data
    for (const product of products) {
      // Remove the id from the product data to let Postgres generate a UUID
      const { id, bestSeller, new: isNew, ...productData } = product;
      
      const { data, error: insertError } = await supabase
        .from('products')
        .insert({
          ...productData,
          best_seller: bestSeller,
          is_new: isNew
        })
        .select();

      if (insertError) {
        console.error(`Error inserting product ${product.name}:`, JSON.stringify(insertError, null, 2));
      } else {
        console.log(`Successfully inserted product ${product.name}:`, data);
      }
    }

    console.log('Products table seeding completed');
  } catch (error) {
    console.error('Error seeding products table:', error);
  }
}

seedProductsTable(); 