/* eslint-disable react/prop-types */
import "./Task.css";
const Task = (props) => {
  return (
    // this is where youd want to delete. put in a boolean state - if deleted is true for this prop, dont render it.
    // update can be put in here as well (change the label)
    // anything that's ever changing make sure there is a state attached to it.
    // an event listener so that when a checkbox is toggled we call a fetch that patches the todo so that its complete - it can all be in here
    // once checked off you can put a line throguh it. figure it out (css style - add a class to the completed task - text decorator line through)
    <div className="search-result">
      <input type="checkbox" id={props.task} />
      <label htmlFor={props.task}>{props.task.name}</label>
    </div>
  );
};

export default Task;

// have a boolean for the database so that it show it is completed or not and that if it is make something happen. (patch request??)
// get some css and work from there after that. commit before you start messing with it 2
