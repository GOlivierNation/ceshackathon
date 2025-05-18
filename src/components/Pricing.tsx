
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "24-hour support response time",
      "1 team member",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    description: "Ideal for growing businesses and teams",
    features: [
      "Unlimited projects",
      "Advanced analytics & reporting",
      "4-hour support response time",
      "Up to 10 team members",
      "API access",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "1-hour support response time",
      "Dedicated account manager",
      "Custom feature development",
      "On-premise deployment option",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent <span className="text-blue-600">pricing</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the plan that fits your needs. No hidden fees or complicated pricing structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden border ${
                plan.highlighted
                  ? "border-blue-600 shadow-lg shadow-blue-100"
                  : "border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className={`w-full mb-6 ${
                    plan.highlighted ? "" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-blue-50 p-8 rounded-xl">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Need a custom plan?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer tailored solutions for larger organizations with specific requirements. 
            Contact our sales team to build a plan that perfectly fits your needs.
          </p>
          <Button size="lg" variant="outline" className="text-blue-600 hover:text-blue-700">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
