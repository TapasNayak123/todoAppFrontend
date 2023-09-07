import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TodoItems from './todoItems';

export default function CreateTodoItem(props) {
  const [inputTextTitle, setInputTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [occurance, setOccurance] = useState("Daily");
  const [category, setCategory] = useState("Personal");
  const [isRemindMe, setRemindMe] = useState(false);
  const [isUserAdded, setUserAdded] = useState(false)

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
    const requestBody = {
      "title": inputTextTitle,
      "dueDate": dueDate,
      "occurance": occurance,
      "category": category,
      "reminder": isRemindMe
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }
    try {
      const addTodoTResp = await axios.post('/todo/create', requestBody, { headers: headers });
      console.log("Print response ", addTodoTResp);
      toast.success("Item added successfully !!!");
      setUserAdded(true);
    } catch (error) {
      console.log("Print error ", error)
    }




  }
  return (
    <div>
    <form>
      <div>
        <label for="fname">Title
          <input type='text' onChange={handleTitleChange} value={inputTextTitle} />
        </label>
      </div>
      <div>
        <label>Due Date</label>
        <input type='date' value={dueDate} onChange={handleDueDateChange} />
      </div>
      <div>
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

      <div>
        <label>Category: </label>
        <label>
          <input type="radio" value="Personal" checked={category === "Personal"} onChange={handleCategoryChange} />
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

      <div>
        <label>Remind Me </label>
        <input type="checkbox" value={isRemindMe}
          onChange={handleRemindmeChange}></input>
      </div>
      <div>
        <label>
          <input type='button' value={"Add Todo"} onClick={handleOnSubmit} />
        </label>
      </div>
    </form>
    {isUserAdded?<TodoItems token={props.token}/>:null}
    </div>
  )
}
