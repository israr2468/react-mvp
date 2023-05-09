/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import TaskBar from "./components/TaskBar";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((data) => setTasks([...data]));
  }, []);
  console.log(tasks);

  return (
    <div className="App">
      <div className="search-bar-container">
        <TaskBar tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
