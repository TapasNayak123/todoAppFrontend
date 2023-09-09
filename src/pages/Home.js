import React from 'react';
import {Link} from 'react-router-dom'
import './style/home.css'

export default function Home() {
  return (
    <div className='AppContent'>

      <h1 style={{textAlign:'center', margin:'auto 0'}}>Welcome to Todo App</h1>

      <p>New to the Application ?</p> <nav><Link to='/register'>Register</Link></nav> <br></br>

      <p>Existing User ?</p> <nav><Link to='/login'>Login</Link></nav> <br></br>


      
    </div>
  )
}
