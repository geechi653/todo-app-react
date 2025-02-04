import ToDoInput from "./ToDoInput";
import ToDoItem from "./ToDoItem";
import { IoTrashBin } from "react-icons/io5";

function ToDoList({ addTask, tasks, toggleTask, deleteTask, clearCompleted }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="container">
      <ToDoInput addTask={addTask} />

      {tasks.length === 0 ? (
        <div className="text-center text-danger fs-5 fw-bold my-4">
          No tasks, add a task
        </div>
      ) : (
        tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))
      )}
      <div className="card mt-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">
              {totalTasks} tasks ({completedTasks} completed)
            </small>
          </div>
          {completedTasks > 0 && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={clearCompleted}
            >
              <IoTrashBin className="me-1" />
              Delete completed tasks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
