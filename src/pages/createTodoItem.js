import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TodoItems from './todoItems';
import './style/AddTodo.css';
import { useLocation, useNavigate } from 'react-router-dom';
export default function CreateTodoItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputTextTitle, setInputTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [occurance, setOccurance] = useState("Daily");
  const [category, setCategory] = useState("Personal");
  const [isRemindMe, setRemindMe] = useState(false);

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  }
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value)

  }
  const handleOccuranceChange = (e) => {
    setOccurance(e.target.value)

  }
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
  const handleRemindmeChange = (e) => {
    setRemindMe(!isRemindMe);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      "title": inputTextTitle,
      "dueDate": dueDate,
      "occurance": occurance,
      "category": category,
      "reminder": isRemindMe
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${location.state}`
    }
    try {
      const addTodoTResp = await axios.post('/todo/create', requestBody, { headers: headers });
      toast.success("Item added successfully !!!");
      navigate('/todoItems', { state: location.state });
    } catch (error) {
      console.log("Print error ", error)
    }




  }
  return (
    <div className='body'>
      <div className="todo-block">
        <h1>Add Todo Items</h1>
        <form onSubmit={handleOnSubmit}>
          <div className='addtitleblock'>
            <label id='title'>Title :
              <input type='text' onChange={handleTitleChange} placeholder="Enter Title" value={inputTextTitle} />
            </label>
          </div>

          <div className='adddueDateblock'>
            <label>Due Date:
              <input type='text' id='dueDate' placeholder="dd/mm/yyyy" value={dueDate} onChange={handleDueDateChange} />
            </label>
          </div>

          <div className='occuranceblock'>
            <label>Occurance: </label>
            <label>
              <input type="radio" value="Daily" checked={occurance === "Daily"} onChange={handleOccuranceChange} />
              Daily
            </label>
            <label>
              <input type="radio" value="Weekly" checked={occurance === "Weekly"} onChange={handleOccuranceChange} />
              Weekly
            </label>
            <label>
              <input type="radio" value="Monthly" checked={occurance === "Monthly"} onChange={handleOccuranceChange} />
              Monthly
            </label>
            <label>
              <input type="radio" value="Yearly" checked={occurance === "Yearly"} onChange={handleOccuranceChange} />
              Yearly
            </label>
          </div>

          <div className='categoryblock'>
            <label>Category: </label>
            <label>
              <input type="radio" style={{ marginLeft: '20px' }} value="Personal" checked={category === "Personal"} onChange={handleCategoryChange} />
              Personal
            </label>

            <label>
              <input type="radio" value="Official" checked={category === "Official"} onChange={handleCategoryChange} />
              Official
            </label>

            <label>
              <input type="radio" value="Social" checked={category === "Social"} onChange={handleCategoryChange} />
              Social
            </label>
          </div>

          <div className='remindMeblock'>
            <label>Remind Me: </label>
            <input type="checkbox" value={isRemindMe}
              onChange={handleRemindmeChange}></input>
          </div>
          <button type='submit' className='button'>Add Todo</button>
        </form>
      </div>
    </div>
  )
}
