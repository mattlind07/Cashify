import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
// Maybe add more as I get further along in my project
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/login" element = {<Login />} />
        {/* <Route path="register" element={<Register />} />  */}
        <Route path="dashboard" element={<Dashboard />} /> 
        {/* <Route path="profile" element={<Profile />} /> 
        <Route path="settings" element={<Settings />}/>
        <Route path="logout" element={<Logout />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />   */}
      </Routes>
    </BrowserRouter>
      
  
  )
}

export default App
