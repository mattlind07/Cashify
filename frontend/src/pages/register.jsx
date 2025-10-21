import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              alert(data.message);
            } else {
              alert(data.message || 'Registration failed');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
          }
        };

    return (
        <div className="pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account 🚀</h1>
                    <p className="text-gray-600">Join us and start your financial journey</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input 
                                    name="name" 
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg" 
                                    placeholder="Enter your full name" 
                                    value={formData.name}
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input 
                                    name="email" 
                                    type="email"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg" 
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
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg" 
                                    placeholder="Create a password" 
                                    type="password" 
                                    value={formData.password}
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Create Account
                        </button>
                        
                        <div className="text-center">
                            <Link 
                                to="/login" 
                                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                            >
                                Already have an account? Sign in here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;