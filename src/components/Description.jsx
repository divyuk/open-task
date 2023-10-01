import { useState } from "react";
import "./Description.css";
function Description({
  taskDesc,
  handleSave,
  selectedId,
  handleDelete,
  handleCompleted,
}) {
  const [editedDescription, setEditedDescription] = useState(taskDesc);
  return (
    <>
      <div className="description">
        <textarea
          rows="10"
          cols="35"
          type="text"
          className="desc-edit"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <div className="container-buttons">
          <span
            className="material-symbols-outlined"
            onClick={() => handleSave(editedDescription, selectedId)}
          >
            save
          </span>
          <span
            class="material-symbols-outlined"
            onClick={() => handleCompleted(selectedId)}
          >
            check_circle
          </span>
          <span
            className="material-symbols-outlined"
            onClick={() => handleDelete(selectedId)}
          >
            delete
          </span>
        </div>
      </div>
    </>
  );
}

export default Description;
