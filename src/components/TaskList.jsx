import SingleTask from "./SingleTask";
import "./TaskList.css";
function TaskList({ tasks, openDescription }) {
  return (
    <div className="taskContainer">
      {tasks.map((task) => (
        <SingleTask
          key={task.id}
          task={task}
          openDescription={openDescription}
        />
      ))}
    </div>
  );
}

export default TaskList;
