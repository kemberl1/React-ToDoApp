//footer с информацией и кнопками
import TasksFilter from "../TasksFilter/TasksFilter";

export default function Footer({toDo, filter, onFilterChange, onDeleteAllCompleted}) {
	return (
		<footer className="footer">
			<span className="todo-count">{toDo} items left</span>
			<TasksFilter filter={filter} onFilterChange={onFilterChange} />
			<button className="clear-completed" onClick={onDeleteAllCompleted}>Clear completed</button>
		</footer>
	)
}