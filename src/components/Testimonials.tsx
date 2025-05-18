
const testimonials = [
  {
    quote: "This platform has completely transformed how our team collaborates and manages projects. The time savings alone has been incredible!",
    author: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80",
  },
  {
    quote: "I've tried many tools over the years, but nothing compares to how intuitive and powerful this platform is. It's a game-changer.",
    author: "Michael Chen",
    role: "CTO at Innovate Inc",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80",
  },
  {
    quote: "The analytics feature alone has given us insights we never had before. We've been able to make data-driven decisions with confidence.",
    author: "Emma Rodriguez",
    role: "Marketing Director at GrowthLabs",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-blue-600">industry leaders</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Hear from our satisfied customers about how our platform has helped transform their businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-500 mr-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center mt-16 gap-8 md:gap-12">
          {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company, index) => (
            <div key={index} className="text-gray-400 font-medium text-xl">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
