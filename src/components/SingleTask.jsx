import "./SingleTask.css";
function SingleTask({ task, openDescription }) {
  return (
    <div
      className="taskItem"
      onClick={() => openDescription(task.id, task.description)}
    >
      {task.title}
    </div>
  );
}

export default SingleTask;
