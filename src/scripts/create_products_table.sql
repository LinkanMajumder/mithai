-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255),
  category VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  best_seller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  reviews INTEGER DEFAULT 0,
  ingredients TEXT[],
  allergens TEXT[],
  weight VARCHAR(50),
  dimensions VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
); 