import { useState } from "react";
import "./Description.css";
function Description({ taskDesc, handleSave, selectedId, handleDelete }) {
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
        <span
          className="material-symbols-outlined"
          onClick={() => handleSave(editedDescription, selectedId)}
        >
          save
        </span>

        <span
          className="material-symbols-outlined delete"
          onClick={() => handleDelete(selectedId)}
        >
          delete
        </span>
      </div>
    </>
  );
}

export default Description;
