import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Heart, Share2, Info, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getProduct, getRelatedProducts } from '../lib/products';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import type { Product } from '../lib/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCartStore();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Product ID is required');

        const productData = await getProduct(id);
        if (!productData) throw new Error('Product not found');

        setProduct(productData);
        const related = await getRelatedProducts(id, productData.category);
        setRelatedProducts(related);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-soft p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-soft p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Product not found</h2>
            <p className="text-gray-600 mb-4">{error || "The product you're looking for doesn't exist or has been removed."}</p>
            <Link to="/products" className="text-primary-600 hover:text-primary-700">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    });
    toast.success(`${product.name} added to cart!`);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link to="/products" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
        
        {/* Product details */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product image */}
            <div className="relative h-96 md:h-full">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.best_seller && (
                <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Best Seller
                </div>
              )}
              {product.is_new && (
                <div className="absolute top-4 left-4 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </div>
              )}
            </div>
            
            {/* Product info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-6">
                {formatPrice(product.price)}
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              {/* Stock status */}
              <div className="mb-6">
                {product.stock > 10 ? (
                  <div className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    In Stock
                  </div>
                ) : product.stock > 0 ? (
                  <div className="text-orange-500 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Low Stock - Only {product.stock} left
                  </div>
                ) : (
                  <div className="text-red-600 flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                    Out of Stock
                  </div>
                )}
              </div>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-l-md hover:bg-gray-200"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 border-y border-gray-300 py-2 text-center focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-r-md hover:bg-gray-200"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleAddToCart}
                  className="flex items-center justify-center"
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
              
              {/* Additional info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Info className="w-4 h-4 mr-2" />
                  <span>Category: <span className="capitalize">{product.category.replace('-', ' ')}</span></span>
                </div>
                {product.weight && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Weight: {product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Dimensions: {product.dimensions}</span>
                  </div>
                )}
                {product.allergens && product.allergens.length > 0 && (
                  <div className="flex items-start text-sm text-gray-500">
                    <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 text-orange-500" />
                    <span>Allergens: {product.allergens.join(', ')}</span>
                  </div>
                )}
              </div>
              
              {/* Share buttons */}
              <div className="flex items-center mt-6">
                <span className="text-sm text-gray-500 mr-4">Share:</span>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'ingredients'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div className="prose max-w-none">
                  {product.ingredients && product.ingredients.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No ingredients information available.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="prose max-w-none">
                  <p>Reviews coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{relatedProduct.name}</h3>
                    <p className="text-primary-600 font-bold">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;