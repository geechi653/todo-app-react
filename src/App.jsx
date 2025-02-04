import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  }, [isDark]);

  return (
    <>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <Header />
      <ToDoList
        addTask={addTask}
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        clearCompleted={clearCompleted}
      />
    </>
  );
}

export default App;
