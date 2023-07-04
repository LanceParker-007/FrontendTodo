import React from "react";

const TodoItem = ({ task, updateHandler, deleteHandler }) => {
  const { title, description, isCompleted, id } = task;
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => updateHandler(id)}
        />
        <button className="btn" onClick={() => deleteHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
