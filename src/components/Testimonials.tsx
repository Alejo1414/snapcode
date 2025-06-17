import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "TechCorp",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
    content:
      "Snapcode has revolutionized my workflow. I can prototype ideas so much faster now. The generated code is surprisingly clean and semantic.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Designer",
    company: "StartupXYZ",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
    content:
      "As someone who designs but doesn't code much, this tool bridges the gap perfectly. My developers love receiving pixel-perfect Tailwind code.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Full Stack Developer",
    company: "WebStudio",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
    content:
      "The accuracy is impressive. It captures complex layouts and converts them into maintainable code. Saved me hours on my last project.",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Loved by Developers & Designers
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of creators who are shipping faster with Snapcode
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-center space-x-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
              </div>

              <div className="mb-6">
                <p className="text-slate-700 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white border border-slate-200 rounded-full px-8 py-4">
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
            </div>
            <div className="text-slate-700">
              <span className="font-semibold">4.9/5</span> from 1,200+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
