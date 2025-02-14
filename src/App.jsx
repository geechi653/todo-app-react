import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDark, setIsDark] = useState(false);

  // alternatively i could store the user_id and api_url in a env file
  const API_URL = "http://yollstudentapi.com/api/todos";
  const USER_ID = 11;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}?user_id=${USER_ID}`);
        const data = await response.json();
        const transformedData = data.map((task) => ({
          ...task,
          isCompleted: task.completed,
        }));
        setTasks(transformedData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: USER_ID,
          title: task.title,
          completed: task.isCompleted,
        }),
      });
      const newTask = await response.json();
      const transformedTask = {
        ...newTask,
        isCompleted: newTask.completed,
      };
      setTasks((prevTasks) => [...prevTasks, transformedTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      console.log("Task", task);

      const updatedTaskData = {
        user_id: USER_ID,
        title: task.title,
        completed: !task.isCompleted,
      };
      console.log("Sending update:", updatedTaskData);

      const response = await fetch(`${API_URL}/${id}?user_id=${USER_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      const updatedTask = await response.json();
      console.log("response", updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id
            ? {
                ...t,
                isCompleted: !t.isCompleted,
              }
            : t
        )
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTasks = tasks.filter((task) => task.isCompleted);
      await Promise.all(
        completedTasks.map((task) =>
          fetch(`${API_URL}/${task.id}?user_id=${USER_ID}`, {
            method: "DELETE",
          })
        )
      );
      setTasks((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
    } catch (error) {
      console.error("Error", error);
    }
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
