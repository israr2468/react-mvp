/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import "./TaskBar.css";

const TaskBar = (props) => {
  // props is an object and its whatever is passed into this function -> object and callback function from app.jsx (tasks, settasks). If you want to be more speciifc you can use tasks(emptyarray), setTasks instead of props so you dont hvae to type out props.task. just understand that it's a catch-all object
  // const [newTask, setNewTask] = useState('');
  const [userResponse, setUserResponse] = useState("");
  const recordResponse = (event) => {
    // Implement record response
    setUserResponse(event.target.value);
  };

  // function handleChange(e) {
  //     setNewTask(e.target.value) // whatever the user is typing in
  //     console.log(newTask);
  // }

  function handleClick() {
    //youll need a fetch in here. line 13 will need to be the same. POST in this function
    // if you wanted 4 inputs you'll want to put a usestate for each one
    // what we want to do is change the tasks array (all of out to-do's)
    props.setTasks([...props.tasks, userResponse]); // whenever you see setSomething the paramter is the new something thats being changed
    // up until this point youve make one task and now you need to map over the whole array

    async function postJSON(data) {
      try {
        const response = await fetch("http://localhost:3000/api/todos", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        props.setTasks([...props.tasks, result]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const data = { name: userResponse, due_date: "2023-04-14T07:00:00.000Z" };
    postJSON(data);
  }

  return (
    <div className="input-wrapper">
      <h2>What are we doing today?</h2>
      <input
        type="text"
        placeholder="Enter task here..."
        onChange={recordResponse}
      />
      <button type="button" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default TaskBar;
