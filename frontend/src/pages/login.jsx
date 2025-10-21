import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login',{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        // You can store user data in localStorage or context
        localStorage.setItem('user', JSON.stringify(data.user));
        // redirect user if needed
        // window.location.href = '/dashboard';
      } else {
        setMessage(`${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('⚠️ Something went wrong');
    }
  };
    

    return (
      <div className="pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back 👋</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 text-lg" 
                    placeholder="Enter your email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input 
                    name="password" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 text-lg" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200"
                >
                  Don't have an account? Sign up here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
  