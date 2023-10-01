import "./SingleTask.css";
function SingleTask({ task, openDescription }) {
  return (
    <div
      className={task.flag == "Yes" ? "completed-task" : "task-item"}
      onClick={() => openDescription(task.id, task.description)}
    >
      {task.title}
    </div>
  );
}

export default SingleTask;
