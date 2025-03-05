import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, ShoppingBag, Star, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import { getProducts, type Product } from '../lib/products';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    category: '',
    collection: '',
    priceRange: '',
    sortBy: 'newest',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Parse query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || '';
    const collection = searchParams.get('collection') || '';
    const priceRange = searchParams.get('price') || '';
    const sortBy = searchParams.get('sort') || 'newest';
    
    setFilters({
      category,
      collection,
      priceRange,
      sortBy,
    });
  }, [location.search]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts(filters);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL
    const searchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) searchParams.set(k, v);
    });
    
    navigate({ search: searchParams.toString() });
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      collection: '',
      priceRange: '',
      sortBy: 'newest',
    });
    
    navigate({ search: '' });
  };
  
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    
    toast.success(`${product.name} added to cart!`);
  };
  
  // Mock categories and collections for the filter sidebar
  const categories = [
    { id: 'chocolates', name: 'Chocolates' },
    { id: 'candies', name: 'Candies' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'gift-boxes', name: 'Gift Boxes' },
    { id: 'seasonal', name: 'Seasonal Treats' },
  ];
  
  const collections = [
    { id: 'bestsellers', name: 'Best Sellers' },
    { id: 'new-arrivals', name: 'New Arrivals' },
    { id: 'limited-edition', name: 'Limited Edition' },
  ];
  
  const priceRanges = [
    { id: '0-10', name: 'Under $10' },
    { id: '10-25', name: '$10 - $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-', name: 'Over $100' },
  ];
  
  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
  ];
  
  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold mb-8">Our Products</h1>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold mb-8">Our Products</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold mb-8">Our Products</h1>
        
        {/* Mobile filter button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleFilterChange('category', category.id)}
                        className={`block w-full text-left px-2 py-1 rounded-md text-sm ${
                          filters.category === category.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Collections */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Collections</h3>
                  <div className="space-y-2">
                    {collections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() => handleFilterChange('collection', collection.id)}
                        className={`block w-full text-left px-2 py-1 rounded-md text-sm ${
                          filters.collection === collection.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {collection.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => handleFilterChange('priceRange', range.id)}
                        className={`block w-full text-left px-2 py-1 rounded-md text-sm ${
                          filters.priceRange === range.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleFilterChange('sortBy', option.id)}
                        className={`block w-full text-left px-2 py-1 rounded-md text-sm ${
                          filters.sortBy === option.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Active filters */}
            {(filters.category || filters.collection || filters.priceRange || filters.sortBy !== 'newest') && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.category && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="mr-1">Category: {categories.find(c => c.id === filters.category)?.name}</span>
                    <button onClick={() => handleFilterChange('category', '')} className="text-gray-500 hover:text-gray-700">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filters.collection && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="mr-1">Collection: {collections.find(c => c.id === filters.collection)?.name}</span>
                    <button onClick={() => handleFilterChange('collection', '')} className="text-gray-500 hover:text-gray-700">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filters.priceRange && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="mr-1">Price: {priceRanges.find(r => r.id === filters.priceRange)?.name}</span>
                    <button onClick={() => handleFilterChange('priceRange', '')} className="text-gray-500 hover:text-gray-700">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filters.sortBy !== 'newest' && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="mr-1">Sort: {sortOptions.find(s => s.id === filters.sortBy)?.name}</span>
                    <button onClick={() => handleFilterChange('sortBy', 'newest')} className="text-gray-500 hover:text-gray-700">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Products count */}
            <div className="mb-6">
              <p className="text-gray-600">Showing {products.length} products</p>
            </div>
            
            {/* Products grid */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                <h2 className="text-xl font-bold mb-2">No products found</h2>
                <p className="text-gray-600 mb-4">Try adjusting your filters or check back later for new products.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-soft group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-accent-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;