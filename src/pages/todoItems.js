import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './style/TodoItems.css';

export default function TodoItems() {

  const location = useLocation();
  const [todoItems, settodoItems] = useState([]);
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${location.state}`
  }
  useEffect(() => {
    getTodoItems();
  }, []);
  const getTodoItems = async () => {
    await axios.get('/todo/getTodoItems', { headers: headers })
      .then((resp) => {
        settodoItems(resp.data)
      }).catch((error) => {
        console.log("Error is  ", error)
      })
  }

  const handleTodoEdit = (item) => {
    item.token = location.state;
    navigate('/editTodoItem', { state: item });
  }

  const handleTodoDelete = async (item) => {
    const itemId = item._id;
    const deleteResp = await axios.delete('/todo/deleteTodo/' + itemId, { headers: headers })
    if (deleteResp.data) {
      const modifiedTodoItems = todoItems.filter(item => item._id !== itemId);
      settodoItems(modifiedTodoItems)
    } else {
      toast.error("Item could not able to delete")
    }

  }

  const createTodoHandler = () => {
    navigate('/addTodoItems', { state: location.state });
  }

  return (
    <div className="todoitems-block">
      <h1>Todo Items</h1>
      <div style={{float:'right', marginRight:'52px', marginBottom:'20px'}} >
        <button className="addbutton" onClick={createTodoHandler}>Add Items</button>
      </div>

      <div>
        {todoItems.length > 0 ? <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Occurance</th>
              <th>Category</th>
              <th>Remind Me </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todoItems.map(todoitem =>
              <tr key={todoitem._id}>
                <td>{todoitem.title}</td>
                <td>{todoitem.dueDate}</td>
                <td>{todoitem.occurance}</td>
                <td>{todoitem.category}</td>
                <td>{todoitem.reminder ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleTodoEdit(todoitem)}>
                    Edit
                  </button>
                </td>

                <td>
                  <button onClick={() => handleTodoDelete(todoitem)}>
                    Delete
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table> : <p>No To do Items added Yet Add come todo items </p>}
      </div>
    </div>
  )
}
