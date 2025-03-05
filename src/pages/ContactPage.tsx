import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Visit Us</h3>
            </div>
            <p className="text-gray-600">
              123 Sweet Street<br />
              Dessert City, DC 12345<br />
              United States
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Call Us</h3>
            </div>
            <p className="text-gray-600">
              <a href="tel:+11234567890" className="hover:text-primary-600">+1 (123) 456-7890</a><br />
              Monday to Friday: 9am - 5pm<br />
              Saturday: 10am - 4pm
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Email Us</h3>
            </div>
            <div className="space-y-4">
              <p>Email us at:</p>
              <a href="mailto:info@mithai.com" className="hover:text-primary-600">info@mithai.com</a><br />
              <a href="mailto:orders@mithai.com" className="hover:text-primary-600">orders@mithai.com</a><br />
              <a href="mailto:support@mithai.com" className="hover:text-primary-600">support@mithai.com</a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact form */}
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Send Us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  required
                ></textarea>
              </div>
              
              <div>
                <Button type="submit" loading={isSubmitting}>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          
          {/* Store hours and map */}
          <div>
            <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-600 mr-2" />
                  <h2 className="text-xl font-bold">Store Hours</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>11:00 AM - 5:00 PM</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 text-gray-600 italic">
                    <p>Holiday hours may vary. Please check our social media for updates.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Find Us</h2>
              </div>
              
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map would be embedded here</p>
              </div>
              
              <div className="p-6">
                <Button 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="outline"
                  fullWidth
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Do you ship nationwide?</h3>
                <p className="text-gray-600">
                  Yes, we ship our products nationwide. Orders over $50 qualify for free standard shipping. Please note that some items may not be available for shipping to certain areas due to temperature concerns.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">How long do your products stay fresh?</h3>
                <p className="text-gray-600">
                  Our products are made fresh and typically have a shelf life of 7-14 days, depending on the item. Specific shelf life information is included with each product. We recommend consuming our treats as soon as possible for the best experience.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Can I place a custom order?</h3>
                <p className="text-gray-600">
                  Absolutely! We love creating custom treats for special occasions. Please contact us at least 7 days in advance for custom orders. You can email us at orders@mithai.com with your requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Do you offer corporate gifting?</h3>
                <p className="text-gray-600">
                  Yes, we offer corporate gifting options for businesses of all sizes. Our gift boxes can be customized with your company logo and personalized messages. Please contact our wholesale department for more information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and Apple Pay for online purchases. In our physical store, we also accept cash and debit cards.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Custom Orders</h3>
          <p>
            We welcome custom orders for special occasions. You can email us at orders@mithai.com with your requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;