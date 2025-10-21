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
      <div>
        <h1 className="text-3xl font-bold text-black mb-6">Welcome Back 👋</h1>
        <div className='flex items-center'>
            <form onClick={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3">
                <input type="text" name="name" className="border p-2 rounded" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                <input className="border p-2 rounded" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">Sign In</button>
                <Link to="/register" className="text-blue-600 font-bold text-sm">Don't have an account? Sign up here</Link>
            </form>
        </div>
      </div>
    );
}
  