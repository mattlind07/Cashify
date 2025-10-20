import Navbar from '../components/navbar';

export default function Login() {
    return (
        
      <div>
        <Navbar />
        
        <h1 className="text-3xl font-bold text-black mb-6">Welcome Back 👋</h1>
        <div className='flex items-center'>
            <form className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3">
                <input className="border p-2 rounded" placeholder="Email" />
                <input className="border p-2 rounded" placeholder="Password" type="password" />
                <button className="bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">Sign In</button>
            </form>
        </div>
    </div>
    );
  }
  