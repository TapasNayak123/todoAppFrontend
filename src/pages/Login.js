import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './style/Login.css'

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [authToken, setAuthToken] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/user/signin', { email, password })
      if (response.data.statusCode === 204) {
        toast.error(response.data.message)
      } else {
        toast.success(response.data.message)
        setData({ email: '', password: '' });
        setAuthToken(response.data.jwtToken)
        setAuthToken(response.data.jwtToken);
        navigate('/todoItems', { state: response.data.jwtToken });
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error => ", error.response.data);
    }

  }


  return (
    <div className='body'>
      <div className="login-block">
      <h1>Login</h1>
  
      <form onSubmit={loginUser}>
        <input type='email' id = "email" placeholder='Enter email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input type='password' id="password" placeholder='Enter password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button type='submit'>Submit</button>
      </form>
    </div>
    </div>
  )
}
