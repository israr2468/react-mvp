/* eslint-disable react/prop-types */
import Task from "./Task";
import "./TaskList.css";

const TaskList = (props) => {
  const handleDelete = (taskId) => {
    props.setTasks(props.tasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteAll = () => {
    fetch("http://localhost:3000/tasks", {
      method: "DELETE",
    }).then(() => {
      props.setTasks([]);
    });
  };

  // console.log(props)
  return (
    <div className="results-list">
      <h3>Task List</h3>
      {props.tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={handleDelete} />
      ))}
      {/* <Task />
            <h4>{props.tasks[0]}</h4>  */}
      <button className="delete-all" onClick={handleDeleteAll}>
        {" "}
        Delete ALL Tasks
      </button>
    </div>
  );
};

export default TaskList;
