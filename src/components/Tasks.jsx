import axios from "axios";
import { useEffect, useState } from "react";
import "./Tasks.css";
import { ToastContainer, toast } from "react-toastify";
import Heading from "./Heading";
import InputTask from "./InputTask";
import TaskList from "./TaskList";
import Description from "./Description";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    flag: "No",
    priority: "low",
  });
  const [showInput, setShowInput] = useState(false);

  const [selectedId, setSelectedId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [taskDesc, setTaskDesc] = useState("");

  // ! side effect to fetch the task once the component is mounted
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

  //! once the form is submitted the taskDetails body is thrown into the api and the old task array is
  //! updated with the new one.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        taskDetails
      );

      // Get the newly created task with its unique ID from the response
      const newTask = { ...taskDetails, id: response.data };

      // Update the tasks state with the new task including the unique ID
      setTasks([...tasks, newTask]);
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

  function openDescription(clickedId, desc) {
    setSelectedId(() => clickedId);
    setShowDescription(!showDescription);
    setTaskDesc(desc);
  }

  function handleEdit() {
    setIsEditing(!isEditing);
    // const td = tasks.find((task) => task.id == selectedId).description;
    // console.log("td: ", td);
    // setEditedDescription(td);
  }

  async function handleSave(newDesc, oldID) {
    console.log(newDesc, oldID);

    const updatedTasks = tasks.map((task) => {
      if (task.id == oldID) {
        console.log("in", task);
        return { ...task, description: newDesc };
      } else return task;
    });
    console.log("Complete array", updatedTasks);
    setTasks(updatedTasks);
    setShowDescription(!showDescription);
  }
  return (
    <>
      <ToastContainer position="top-center" />
      <Heading />
      <InputTask
        handleSubmit={handleSubmit}
        taskDetails={taskDetails}
        setTaskDetails={setTaskDetails}
        showInput={showInput}
        setShowInput={setShowInput}
      />
      <TaskList tasks={tasks} openDescription={openDescription} />

      {showDescription && (
        <Description
          taskDesc={taskDesc}
          handleSave={handleSave}
          selectedId={selectedId}
        />
      )}
    </>
  );
}

export default Tasks;
