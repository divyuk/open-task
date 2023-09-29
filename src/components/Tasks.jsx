import axios from "axios";
import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    desciption: "",
    flag: "No",
    priority: "low",
  });

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        taskDetails
      );
      console.log(response.data);
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.log("Something went wrong...", err);
    } finally {
      setTaskDetails({
        title: "",
        desciption: "",
        flag: "No",
        priority: "low",
      });
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    // this will be like {name : title} then [name] will give title
    setTaskDetails({ ...taskDetails, [name]: value });
  }

  return (
    <>
      <h1>Tasks</h1>
      <div>
        {tasks.map((task) => (
          <p key={task.id}>{task.title}</p>
        ))}
      </div>

      <button onClick={() => setShowInput(!showInput)}>+</button>
      {/* Input for Task */}
      {showInput && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={taskDetails.title}
          />

          <label htmlFor="desciption">Desciption : </label>
          <input
            type="text"
            id="desciption"
            name="desciption"
            onChange={handleInputChange}
            value={taskDetails.desciption}
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
    </>
  );
}

export default Tasks;
