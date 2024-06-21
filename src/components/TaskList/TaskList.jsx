import PropTypes from 'prop-types'

import Task from '../Task/Task'

export default function TaskList({
  todos = [],
  onDeleted = () => {},
  onToggleDone = () => {},
  onEdit = () => {},
  timers = {},
  startTimer = () => {},
  pauseTimer = () => {},
}) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          label={todo.label}
          done={todo.done}
          createdDate={new Date()}
          minutes={todo.minutes}
          seconds={todo.seconds}
          onDeleted={onDeleted}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          timers={timers}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
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
      seconds: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
}
