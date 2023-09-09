
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import TodoItems from './pages/todoItems';
import CreateTodoItem from './pages/createTodoItem';
import EditTodoItem from './pages/editTodoItems';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;


function App() {
  return (
    <div className="App">
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/todoItems' element={<TodoItems />} />
        <Route path='/addTodoItems' element={<CreateTodoItem />} />
        <Route path='/editTodoItem' element={<EditTodoItem />} />
      </Routes>
    </div>
  );
}

export default App;
