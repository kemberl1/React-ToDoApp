import PropTypes from 'prop-types'

import Task from '../Task/Task'

export default function TaskList({ todos = [], onDeleted = () => {}, onToggleDone = () => {}, onEdit = () => {} }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          label={todo.label}
          done={todo.done}
          createdDate={new Date()}
          onDeleted={() => onDeleted(todo.id)}
          onToggleDone={() => onToggleDone(todo.id)}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
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
  onEdit: PropTypes.func.isRequired,
}
