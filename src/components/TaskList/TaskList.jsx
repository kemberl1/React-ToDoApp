//список задач
import Task from "../Task/Task"

export default function TaskList({ todos, onDeleted, onToggleDone }) {
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
					onToggleDone={() => onToggleDone(id)} />
				)
			})}
		</ul>
	)
}
