import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import './style/EditTodo.css';
export default function EditTodoItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const [inputTextTitle, setInputTitle] = useState(location.state.title);
    const [dueDate, setDueDate] = useState(location.state.dueDate);
    const [occurance, setOccurance] = useState(location.state.occurance);
    const [category, setCategory] = useState(location.state.category);
    const [isRemindMe, setRemindMe] = useState(location.state.reminder);

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
        const id = location.state._id;
        const authToken = location.state.token
        const requestBody = {
            "title": inputTextTitle,
            "dueDate": dueDate,
            "occurance": occurance,
            "category": category,
            "reminder": isRemindMe
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }

        const updateTodoResp = await axios.put('/todo/updateTodo/' + id, requestBody, { headers: headers });
        if (updateTodoResp.status === 200) {
            toast.success("Item updated successfull !!");
            navigate('/todoItems', { state: authToken });
        }

    }
    return (
        <div className='body'>
            <div className="todo-block">
                <h1>Edit Todo Items</h1>
                <form onSubmit={handleOnSubmit}>
                    <div className='titleblock'>
                        <label for="fname">Title
                            <input type='text' onChange={handleTitleChange} value={inputTextTitle} />
                        </label>
                    </div>
                    <div className='dueDateblock'>
                        <label >Due Date</label>
                        <input type='test' value={dueDate} onChange={handleDueDateChange} />
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
                            <input type="radio" style={{ marginLeft: '17px' }} value="Personal" checked={category === "Personal"} onChange={handleCategoryChange} />
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
                        <label>Remind Me </label>
                        <input type="checkbox"
                            checked={isRemindMe}
                            onChange={handleRemindmeChange}></input>
                    </div>
                    <button type='submit' className='button'>Edit Todo</button>
                </form>
            </div>
        </div>
    )
}
