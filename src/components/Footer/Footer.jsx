//footer с информацией и кнопками
import TasksFilter from "../TasksFilter/TasksFilter";
import PropTypes from "prop-types";

export default function Footer({
  toDo = 0,
  filter = "all",
  onFilterChange = () => {},
  onDeleteAllCompleted = () => {},
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onDeleteAllCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  toDo: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onDeleteAllCompleted: PropTypes.func.isRequired,
};
