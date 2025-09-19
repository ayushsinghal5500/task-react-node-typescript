import { useNavigate } from 'react-router-dom';

export const Index = () => {
  const navigate = useNavigate();
  
  // Function to handle navigation to signup with role selection
  const handleSignup = (role) => {
    navigate('/register', { state: { role } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S&M
          </div>
          <span className="ml-3 text-xl font-bold text-gray-800">Students & Mentors</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">Success Stories</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">FAQ</a>
        </div>
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Connect, Learn, and Grow Together
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fadeIn delay-300">
            Our platform brings students and mentors together to create meaningful learning experiences. 
            Gain valuable knowledge, guidance, and support to achieve your academic and career goals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slideUp">
            <button
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
              onClick={() => handleSignup('student')}
            >
              Join as Student
            </button>
            <button
              className="bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-800 transition transform hover:-translate-y-1"
              onClick={() => handleSignup('mentor')}
            >
              Join as Mentor
            </button>
          </div>
        </div>
        <div className="mt-16 animate-fadeIn delay-700">
          <div className="w-24 h-1 bg-white opacity-50 mx-auto mb-3"></div>
          <p className="text-blue-200">Trusted by thousands of students and mentors worldwide</p>
        </div>
      </header>

      {/* Value Proposition Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            We're dedicated to creating meaningful connections that foster growth, learning, and success.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Matching</h3>
              <p className="text-gray-600">We connect students with mentors who match their specific goals, interests, and learning styles.</p>
            </div>
            
            <div className="p-6 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning Paths</h3>
              <p className="text-gray-600">Follow curated learning journeys or create custom paths with your mentor's guidance.</p>
            </div>
            
            <div className="p-6 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Connect with mentors at times that work for you, regardless of time zones or busy schedules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <div className="text-blue-600 text-4xl font-bold mb-4">01</div>
              <h3 className="text-2xl font-semibold mb-4">Create Your Profile</h3>
              <p className="text-gray-600">Sign up as a student or mentor. Share your interests, goals, and availability to help us make the perfect match.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={() => navigate("/register")}
              >
                Create Profile
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 h-64 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md w-64">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                    <div className="ml-4">
                      <div className="h-3 w-32 bg-gray-200 rounded"></div>
                      <div className="h-2 w-24 bg-gray-200 rounded mt-2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-12">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <div className="text-blue-600 text-4xl font-bold mb-4">02</div>
              <h3 className="text-2xl font-semibold mb-4">Find Your Match</h3>
              <p className="text-gray-600">Our algorithm suggests ideal mentor-student pairs based on compatibility factors, or you can browse profiles yourself.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={() => navigate("/login")}
              >
                Find Matches
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-6 h-64 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-lg font-semibold">Suggested Matches</div>
                    <div className="text-blue-600 text-sm">View all</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full"></div>
                      <div className="ml-4">
                        <div className="font-medium">Dr. Sarah Johnson</div>
                        <div className="text-sm text-gray-500">Computer Science Professor</div>
                      </div>
                      <button className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Connect</button>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full"></div>
                      <div className="ml-4">
                        <div className="font-medium">Mark Williams</div>
                        <div className="text-sm text-gray-500">Industry Expert</div>
                      </div>
                      <button className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <div className="text-blue-600 text-4xl font-bold mb-4">03</div>
              <h3 className="text-2xl font-semibold mb-4">Start Your Journey</h3>
              <p className="text-gray-600">Begin your mentoring relationship with structured sessions, goal tracking, and progress monitoring.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 h-64 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold">Weekly Session</div>
                    <div className="text-sm text-gray-500">Today, 3:00 PM</div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                    <div className="ml-3">
                      <div className="font-medium">Alex Morgan</div>
                      <div className="text-sm text-gray-500">Your Student</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Session Topic</div>
                    <div className="font-medium">Advanced JavaScript Concepts</div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Join Session</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Success Stories</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Hear from students and mentors who have transformed their journeys through our platform.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-600">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"My mentor helped me navigate my career path and land an internship at a major tech company. The guidance I received was invaluable."</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-400 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Dr. Lisa Rodriguez</h4>
                  <p className="text-gray-600">Research Scientist & Mentor</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"Mentoring through this platform has been incredibly rewarding. I've watched my students grow and achieve their goals, which is the greatest satisfaction for an educator."</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={() => navigate("/testimonials")}
            >
              Read More Success Stories
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">Join thousands of students and mentors who are already transforming education through meaningful connections.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
              onClick={() => navigate("/register")}
            >
              Sign Up Now
            </button>
            <button
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                S&M
              </div>
              <span className="ml-2 font-bold">Students & Mentors</span>
            </div>
            <p className="text-gray-400">Connecting learners with guides to shape the future of education.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate("/students")} className="text-gray-400 hover:text-white transition">For Students</button></li>
              <li><button onClick={() => navigate("/mentors")} className="text-gray-400 hover:text-white transition">For Mentors</button></li>
              <li><button onClick={() => navigate("/pricing")} className="text-gray-400 hover:text-white transition">Pricing</button></li>
              <li><button onClick={() => navigate("/success-stories")} className="text-gray-400 hover:text-white transition">Success Stories</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate("/blog")} className="text-gray-400 hover:text-white transition">Blog</button></li>
              <li><button onClick={() => navigate("/tutorials")} className="text-gray-400 hover:text-white transition">Tutorials</button></li>
              <li><button onClick={() => navigate("/help")} className="text-gray-400 hover:text-white transition">Help Center</button></li>
              <li><button onClick={() => navigate("/community")} className="text-gray-400 hover:text-white transition">Community</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate("/about")} className="text-gray-400 hover:text-white transition">About Us</button></li>
              <li><button onClick={() => navigate("/careers")} className="text-gray-400 hover:text-white transition">Careers</button></li>
              <li><button onClick={() => navigate("/contact")} className="text-gray-400 hover:text-white transition">Contact</button></li>
              <li><button onClick={() => navigate("/privacy")} className="text-gray-400 hover:text-white transition">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Students & Mentors Platform. All rights reserved.
        </div>
      </footer>     
    </div>
  );
};