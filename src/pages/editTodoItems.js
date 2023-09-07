import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
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
    const handleRemindmeChange = (value) => {
        setRemindMe(!isRemindMe);
    }
    const handleOnSubmit = async () => {
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
                        <input type='button' value={"Edit Todo"} onClick={handleOnSubmit} />
                    </label>
                </div>
            </form>
        </div>
    )
}
