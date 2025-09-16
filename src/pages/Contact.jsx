import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Contact Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Get in <span className="text-indigo-600">Touch</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Have questions or feedback? We'd love to hear from you. Reach out to us using the form below or through our contact information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="py-10 px-6 sm:p-10">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>
                
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-green-800">Thank you for your message! We'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="How can we help?"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Your message..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="-ml-1 mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-indigo-700 py-10 px-6 sm:px-10 text-white">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                <p className="mb-8 text-indigo-100">
                  Have questions about our services or need support? Reach out to us through any of the channels below and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 bg-indigo-600 rounded-lg p-3">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-indigo-200">Email</h3>
                      <p className="text-base text-white">support@wellnest.com</p>
                      <p className="text-base text-white">info@wellnest.com</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-indigo-600 rounded-lg p-3">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-indigo-200">Phone</h3>
                      <p className="text-base text-white">+1 (555) 123-4567</p>
                      <p className="text-sm text-indigo-100">Monday - Friday, 9am - 5pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-indigo-600 rounded-lg p-3">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-indigo-200">Office</h3>
                      <p className="text-base text-white">123 Wellness Way</p>
                      <p className="text-base text-white">San Francisco, CA 94103</p>
                      <p className="text-base text-white">United States</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-sm font-medium text-indigo-200 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'Facebook', icon: 'facebook' },
                      { name: 'Twitter', icon: 'twitter' },
                      { name: 'Instagram', icon: 'instagram' },
                      { name: 'LinkedIn', icon: 'linkedin' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="text-indigo-200 hover:text-white"
                        aria-label={social.name}
                      >
                        <span className="sr-only">{social.name}</span>
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
                          <i className={`fab fa-${social.icon} text-lg`}></i>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="divide-y divide-gray-200">
              {[
                {
                  question: 'How quickly can I expect a response to my inquiry?',
                  answer: 'We strive to respond to all inquiries within 24-48 hours during our business days (Monday to Friday). For urgent matters, please call our support line.'
                },
                {
                  question: 'Do you offer emergency mental health services?',
                  answer: "While we provide support and resources, we are not an emergency service. If you're in crisis, please contact emergency services or a crisis hotline in your area immediately."
                },
                {
                  question: 'Can I schedule an appointment through this contact form?',
                  answer: 'Yes, you can request an appointment through this form. Our team will get back to you to confirm the details and schedule a convenient time.'
                },
                {
                  question: 'What information should I include in my message?',
                  answer: 'Please include your name, contact information, and a detailed description of how we can assist you. The more information you provide, the better we can address your needs.'
                }
              ].map((faq, index) => (
                <div key={index} className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{faq.question}</h3>
                  <div className="mt-2">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
