//footer с информацией и кнопками
import TasksFilter from "../TasksFilter/TasksFilter";

export default function Footer({toDo}) {
	return (
		<footer className="footer">
			<span className="todo-count">{toDo} items left</span>
			<TasksFilter />
			<button className="clear-completed">Clear completed</button>
		</footer>
	)
}