import { IoTrashBin } from "react-icons/io5";

function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex align-items-center py-2">
        <div className="form-check mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTask(task.id)}
          />
          <label
            className={`form-check-label ${
              task.isCompleted ? "text-decoration-line-through text-muted" : ""
            }`}
          >
            {task.title}
          </label>
        </div>
        <button
          className="btn btn-outline-danger btn-sm ms-auto"
          onClick={() => deleteTask(task.id)}
        >
          <IoTrashBin />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
