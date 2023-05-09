/* eslint-disable react/prop-types */
import Task from "./Task";
import "./TaskList.css";

const TaskList = (props) => {
  // console.log(props)
  return (
    <div className="results-list">
      <h3>TaskList</h3>
      {props.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      {/* <Task />
            <h4>{props.tasks[0]}</h4>  */}
    </div>
  );
};

export default TaskList;
