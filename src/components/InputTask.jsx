import { useState } from "react";
import "./InputTask.css";
function InputTask({
  handleSubmit,
  taskDetails,
  setTaskDetails,
  showInput,
  setShowInput,
}) {
  function handleInputChange(e) {
    const { name, value } = e.target;
    // this will be like {name : title} then [name] will give title
    setTaskDetails({ ...taskDetails, [name]: value });
  }
  return (
    <div className="container-intput">
      <button className="button" onClick={() => setShowInput(!showInput)}>
        +
      </button>
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
    </div>
  );
}

export default InputTask;
