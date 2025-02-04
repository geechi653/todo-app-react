import { IoMoon, IoSunny } from "react-icons/io5";

function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      className={`btn ${
        isDark ? "btn-light" : "btn-dark"
      } position-fixed top-0 end-0 m-3`}
      onClick={toggleTheme}
    >
      {isDark ? <IoSunny /> : <IoMoon />}
    </button>
  );
}

export default ThemeToggle;
