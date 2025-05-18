
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-90"></div>
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-blue-100 rounded-bl-[100px] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="text-blue-600">Simplify</span> Your Workflow
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Boost productivity and streamline your processes with our intuitive all-in-one platform designed for modern teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="text-base font-medium px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-base font-medium px-8">
                View Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-600">Join <span className="font-medium text-blue-600">2,000+</span> happy users</p>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-300 rounded-full opacity-20"></div>
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <div className="aspect-video rounded-lg bg-blue-50 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
