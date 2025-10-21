import React, { useState } from 'react';

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
        <div className='flex items-center'>
            <h1 className="text-3xl font-bold text-black mb-6">Create Account 🚀</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3">
                <input name="name" className="border p-2 rounded" placeholder="Name" onChange={handleChange} required/>
                <input name="email" className="border p-2 rounded" placeholder="Email" onChange={handleChange} required/>
                <input name="password" className="border p-2 rounded" placeholder="Password" type="password" onChange={handleChange} required />
                <button className="bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">Register</button>
            </form>
        </div>
    );
}

export default Register;