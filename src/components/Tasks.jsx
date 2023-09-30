import axios from "axios";
import { useEffect, useState } from "react";
import "./Tasks.css";
import { ToastContainer, toast } from "react-toastify";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    flag: "No",
    priority: "low",
  });

  const [showDescription, setShowDescription] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  const [taskDesc, setTaskDesc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/tasks", taskDetails);
      setTasks([...tasks, taskDetails]);
    } catch (err) {
      toast.error("Title & description are required field");
      console.log("Something went wrong...", err);
    } finally {
      setTaskDetails({
        title: "",
        description: "",
        flag: "No",
        priority: "low",
      });
      setShowInput(!showInput);
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    // this will be like {name : title} then [name] will give title
    setTaskDetails({ ...taskDetails, [name]: value });
  }
  function openDescription(clickedId, desc) {
    setSelectedId(clickedId);
    setShowDescription(!showDescription);
    setEditedDescription(desc);
  }

  useEffect(() => {
    const td = tasks.find((task) => task.id === selectedId)?.description;
    setTaskDesc(td);
  }, [selectedId, tasks]);

  function handleEdit() {
    setIsEditing(!isEditing);
    setEditedDescription(taskDesc);
  }

  async function handleSave() {
    // Steps to perform save
    setIsEditing(!isEditing);
    // 1. Take the new description and add it to tasks
    const newTask = tasks.map((task) => {
      if (task.id == selectedId) {
        console.log("Inside", editedDescription);
        return { ...task, description: editedDescription };
      } else return task;
    });
    console.log(newTask);
    setTasks(newTask);
    // 2. Call the put method and pass the updated Body
    try {
      const id = selectedId;
      const d = { description: editedDescription };
      await axios.put(`http://localhost:3000/tasks/${id}`, d);
    } catch (err) {
      console.log("Something went wrong...", err);
    }
  }
  return (
    <>
      <ToastContainer position="top-center" />
      <h1 className="heading">Tasks</h1>
      <div className="taskContainer">
        {tasks.map((task) => (
          <li
            className="taskItem"
            key={task.id}
            onClick={() => openDescription(task.id, task.description)}
          >
            {task.title}
          </li>
        ))}
        <button className="button" onClick={() => setShowInput(!showInput)}>
          +
        </button>
      </div>
      {/* Input for Task */}
      {showInput && (
        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={taskDetails.title}
          />

          <label htmlFor="description">Description : </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={taskDetails.description}
          />
          <label htmlFor="priority">Priority : </label>
          <select
            value={taskDetails.priority}
            onChange={handleInputChange}
            name="priority"
            id="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Add It! </button>
        </form>
      )}

      {showDescription && (
        <div className="description">
          {isEditing ? (
            <textarea
              rows="10"
              cols="35"
              type="text"
              className="desc-edit"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder={taskDesc}
            />
          ) : (
            <p>{editedDescription}</p>
          )}
          {isEditing ? (
            <span className="material-symbols-outlined" onClick={handleSave}>
              save
            </span>
          ) : (
            <span className="material-symbols-outlined" onClick={handleEdit}>
              edit_note
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default Tasks;
