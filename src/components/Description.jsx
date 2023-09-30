import { useState } from "react";
import "./Description.css";
function Description({ taskDesc, handleSave, selectedId }) {
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
      </div>
    </>
  );
}

export default Description;
