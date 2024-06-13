//список задач
import Task from "../Task/Task";
import PropTypes from "prop-types";
export default function TaskList({
  todos = [],
  onDeleted = () => {},
  onToggleDone = () => {},
}) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const { id, ...itemProps } = todo;
        return (
          <Task
            key={id}
            createdDate={new Date()}
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        );
      })}
    </ul>
  );
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};
