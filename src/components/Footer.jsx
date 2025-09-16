import { Link } from 'react-router-dom';
import { Heart, Twitter, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'Webinars', path: '/webinars' },
        { name: 'Community', path: '/community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'GDPR', path: '/gdpr' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com/wellnest' },
    { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com/wellnest' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/wellnest' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com/company/wellnest' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">W</div>
              <span className="ml-2 text-2xl font-bold">WellNest</span>
            </div>
            <p className="text-gray-400">
              Your mental wellness companion. We provide tools, resources, and support to help you on your journey to better mental health.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-gray-400">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form className="mt-4 sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <Link to="/contact" className="text-gray-400 hover:text-white flex items-center">
                <MessageCircle className="h-5 w-5 mr-1" />
                <span>Contact Support</span>
              </Link>
            </div>
            <div className="mt-8 md:mt-0 flex items-center justify-center md:justify-start">
              <p className="text-base text-gray-400 flex items-center">
                Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> by WellNest Team
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-400 md:text-right">
                &copy; {currentYear} WellNest. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
