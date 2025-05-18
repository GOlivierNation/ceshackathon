
import { ChevronRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <a href="#" className="flex items-center">
                <span className="text-2xl font-bold text-blue-400">SaaS</span>
                <span className="text-2xl font-bold text-white ml-1">Platform</span>
              </a>
            </div>
            <p className="mb-4 max-w-md">
              Streamline your workflow and boost productivity with our all-in-one platform 
              designed for modern teams.
            </p>
            <div className="flex space-x-4">
              {["#", "#", "#", "#"].map((link, index) => (
                <a 
                  key={index}
                  href={link} 
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Product</h3>
            <ul className="space-y-2">
              {["Features", "Integrations", "Pricing", "FAQ", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors inline-flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Legal", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors inline-flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Subscribe</h3>
            <p className="mb-4">Stay updated with our latest features and releases.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-3 py-2 text-gray-700 bg-white rounded-l text-sm focus:outline-none w-full"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              &copy; {currentYear} SaaS Platform. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
