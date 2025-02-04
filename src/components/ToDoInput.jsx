import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function ToDoInput({ addTask }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const task = {
      id: Date.now(),
      title: input,
      isCompleted: false,
    };
    addTask(task);
    setInput("");
  };

  return (
    <div className="input-group justify-content-center mb-2">
      <span className="input-group-text">
        <FaTasks />
      </span>
      <input
        id="add__input"
        className="form-control"
        type="text"
        placeholder="Add a new task"
        onChange={handleInput}
        value={input}
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        <IoMdAdd />
      </button>
    </div>
  );
}

export default ToDoInput;
