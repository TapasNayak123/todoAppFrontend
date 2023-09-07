import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import CreateTodoItem from './createTodoItem';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
  const getTodoItems = () => {
    axios.get('/todo/getTodoItems', { headers: headers })
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
      console.log("Inside else block !!")
      toast.error("Item could not able to delete")
    }

  }

  return (
    <div>
      {todoItems.length > 1 ? <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Occurance</th>
            <th>Category</th>
            <th>Remind Me </th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map(todoitem =>
            <tr key={todoitem.id}>
              <td>{todoitem.title}</td>
              <td>{todoitem.dueDate}</td>
              <td>{todoitem.occurance}</td>
              <td>{todoitem.category}</td>
              <td>{todoitem.reminder}</td>
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
      </table> : <CreateTodoItem token={location.state} />}
    </div>
  )
}
