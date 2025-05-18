
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, MessageSquare, CheckCircle, Shield, Building, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gov-blue text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white text-gov-blue flex items-center justify-center font-bold mr-3">
              CE
            </div>
            <h1 className="text-xl font-bold">Citizen Engagement System</h1>
          </div>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-gov-blue"
            onClick={() => navigate("/login")}
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gov-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Citizens with Government Services</h1>
          <p className="text-xl mb-8">
            Submit, track, and resolve public service complaints through our streamlined platform.
          </p>
          <Button 
            className="bg-white text-gov-blue hover:bg-gray-100 px-6 py-6 text-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-gov-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Your Complaint</h3>
              <p className="text-gray-600">
                Easily submit detailed complaints about public services with our simple form. Add locations, photos, and descriptions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-gov-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Your Case</h3>
              <p className="text-gray-600">
                Monitor the status of your complaint in real-time. Receive updates and communicate directly with handling agencies.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-gov-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Resolution</h3>
              <p className="text-gray-600">
                Receive transparent updates as your issue is addressed. Rate the service and provide feedback on the resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">For Everyone</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border p-8 rounded-lg border-gray-200">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Citizens</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Submit complaints easily
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Track status in real-time
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Communicate with agencies
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Rate service quality
                </li>
              </ul>
            </div>
            
            <div className="border p-8 rounded-lg border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Government Agencies</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Manage assigned complaints
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Update citizens on progress
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Coordinate with other agencies
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Track performance metrics
                </li>
              </ul>
            </div>
            
            <div className="border p-8 rounded-lg border-gray-200">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Administrators</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Oversee all system activities
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Manage users and permissions
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Configure complaint categories
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Generate analytics reports
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gov-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our platform today to start submitting and tracking your public service complaints.
          </p>
          <Button 
            className="bg-white text-gov-teal hover:bg-gray-100 px-6 py-6 text-lg"
            onClick={handleGetStarted}
          >
            Login Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Citizen Engagement System</h3>
              <p className="text-gray-400 max-w-md">
                Connecting citizens with government services for efficient complaint resolution.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Data Protection</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Citizen Engagement System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
