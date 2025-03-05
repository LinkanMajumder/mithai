import React from 'react';
import { Award, Heart, Users, Coffee } from 'lucide-react';
import { Button } from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Story</h1>
              <p className="text-gray-600 mb-6">
                Founded in 2015, Mithai began as a small family-run Indian sweet shop with a passion for creating authentic Indian desserts using traditional recipes passed down through generations. What started as a humble shop has grown into a beloved brand that brings the rich flavors of Indian sweets to homes across the country.
              </p>
              <p className="text-gray-600 mb-6">
                Every sweet treat we create is made with love and attention to detail, ensuring that each bite brings joy and satisfaction to our customers.
              </p>
              <div>
                <Button href="/contact">Get in Touch</Button>
              </div>
            </div>
            <div className="h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Mithai sweet shop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Our values */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-gray-600">
                We use only the finest ingredients and never compromise on quality. Each product is crafted to perfection.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passion</h3>
              <p className="text-gray-600">
                Our love for baking and creating sweet experiences drives everything we do. We're passionate about our craft.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building relationships with our customers and giving back to the communities we serve.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tradition</h3>
              <p className="text-gray-600">
                We honor traditional recipes and techniques while embracing innovation to create unique sweet experiences.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our team */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-primary-600 mb-4">Founder & Head Baker</p>
                <p className="text-gray-600">
                  With over 15 years of experience in pastry arts, Sarah brings creativity and expertise to every recipe.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Michael Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
                <p className="text-primary-600 mb-4">Master Chocolatier</p>
                <p className="text-gray-600">
                  Michael's passion for chocolate has led him to create our award-winning truffle collections.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Emily Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Emily Rodriguez</h3>
                <p className="text-primary-600 mb-4">Pastry Chef</p>
                <p className="text-gray-600">
                  Emily specializes in creating delicate pastries that are as beautiful as they are delicious.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our story */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-display font-bold text-center mb-8">Our Journey</h2>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xl">
                    2015
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                  <p className="text-gray-600">
                    Mithai opened its first small shop in downtown, offering a curated selection of handcrafted Indian sweets and mithai. Our small team of three worked tirelessly to perfect traditional recipes and build a loyal customer base who appreciated authentic Indian flavors.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xl">
                    2017
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-xl font-bold mb-2">Expanding Our Offerings</h3>
                  <p className="text-gray-600">
                    After gaining recognition for our quality products, we expanded our menu to include pastries, cakes, and seasonal treats. We also began offering custom orders for special occasions.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xl">
                    2020
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-xl font-bold mb-2">Going Online</h3>
                  <p className="text-gray-600">
                    In response to changing customer needs, we launched our online store, making it possible to deliver our sweet treats nationwide. This allowed us to reach more customers and share our passion for quality sweets with a broader audience.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xl">
                    2023
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-xl font-bold mb-2">Today & Beyond</h3>
                  <p className="text-gray-600">
                    Today, Mithai continues to grow while maintaining our commitment to quality and authenticity. We're constantly innovating and creating new interpretations of classic Indian sweets while staying true to our core values and traditional recipes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary-600 rounded-lg shadow-soft overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Join Our Sweet Community</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Sign up for our newsletter to receive updates, special offers, and sweet recipes delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-800"
                required
              />
              <Button type="submit" variant="accent">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;