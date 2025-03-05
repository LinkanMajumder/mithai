import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  TruckIcon,
  ShieldCheck,
  Clock,
  Heart,
  Package,
  Gift,
  Instagram,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getFeaturedProducts, getProducts, type Product } from '../lib/products';
import { formatPrice } from '../lib/utils';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featured = await getFeaturedProducts();
        const bestSeller = await getProducts({ collection: 'bestsellers' });
        const newProds = await getProducts({ collection: 'new-arrivals' });
        setFeaturedProducts(featured);
        setBestSellers(bestSeller);
        setNewProducts(newProds);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Hero image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover the Sweet Life
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Indulge in our handcrafted confections made with love and the finest ingredients.
              From classic favorites to unique creations, we have something for every sweet tooth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/products" size="lg" className="bg-primary-600 hover:bg-primary-700">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                to="/about"
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        {/* Image Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Explore Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg group h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Chocolates" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Chocolates</h3>
                <p className="text-gray-200 mb-4">Indulge in our premium chocolate creations</p>
                <Link to="/products?category=chocolates" className="inline-flex items-center text-white hover:text-primary-300 transition-colors">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg group h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Pastries" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Pastries</h3>
                <p className="text-gray-200 mb-4">Delicate and delicious baked treats</p>
                <Link to="/products?category=pastries" className="inline-flex items-center text-white hover:text-primary-300 transition-colors">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg group h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1581798459219-318e68f60c8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Gift Boxes" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Gift Boxes</h3>
                <p className="text-gray-200 mb-4">Perfect presents for any occasion</p>
                <Link to="/products?category=gift-boxes" className="inline-flex items-center text-white hover:text-primary-300 transition-colors">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-soft group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.best_seller && (
                    <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Best Seller
                    </div>
                  )}
                  {product.is_new && (
                    <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      New Arrival
                    </div>
                  )}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-accent-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <Button href={`/products/${product.id}`} variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Why Choose Mithai?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <TruckIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on all orders over $50. We deliver to your doorstep within 1-3 business days.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">
                We use only the finest ingredients to create our handcrafted treats. Satisfaction guaranteed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fresh Daily</h3>
              <p className="text-gray-600">
                Our products are made fresh daily to ensure you receive the best quality and taste.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold">Best Sellers</h2>
            <Link to="/products?filter=best-sellers" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-soft h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Best Seller
                    </div>
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
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <div className="flex text-accent-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The chocolate truffles are absolutely divine! They arrived beautifully packaged and tasted even better than they looked. Will definitely order again!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-bold">Jane Doe</h4>
                  <p className="text-gray-500 text-sm">Loyal Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <div className="flex text-accent-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "I ordered the luxury gift hamper for my mother's birthday and she was thrilled! Everything was fresh and delicious. The presentation was stunning too."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold mr-4">
                  MS
                </div>
                <div>
                  <h4 className="font-bold">Michael Smith</h4>
                  <p className="text-gray-500 text-sm">Happy Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <div className="flex text-accent-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The macarons are the best I've had outside of Paris! Perfect texture and flavor. The seasonal berry tarts are also incredible. Fast shipping too!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold mr-4">
                  AJ
                </div>
                <div>
                  <h4 className="font-bold">Amanda Johnson</h4>
                  <p className="text-gray-500 text-sm">Repeat Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold">New Arrivals</h2>
            <Link to="/products?filter=new" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-soft h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                      New Arrival
                    </div>
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
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Join Our Sweet Community</h2>
            <p className="text-primary-100 mb-8">
              Subscribe to our newsletter for exclusive offers, new product announcements, and sweet recipes delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-800"
                required
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;