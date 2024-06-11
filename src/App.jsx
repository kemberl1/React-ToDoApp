//верхний компонент
import TaskList from "./components/TaskList/TaskList";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import Footer from "./components/Footer/Footer"
import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {

	state = {
		todoData: [
			this.createToDoItem('Привет!'),
		],
		filter: 'all'
	};

	createToDoItem(label) {
		const newId = uuidv4();
		return {
			label,
			id: newId,
			done: false,
		}
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const index = todoData.findIndex((el) => el.id === id);
			const newArray = todoData.toSpliced(index, 1);
			return {
				todoData: newArray
			};
		});
	}

	addItem = (text) => {
		const newItem = this.createToDoItem(text)
		this.setState(({ todoData }) => {
			const newArray = todoData.concat(newItem)
			return { todoData: newArray }
		})
	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			const index = todoData.findIndex((el) => el.id === id);
			const oldItem = todoData[index];
			const newItem = { ...oldItem, done: !oldItem.done }
			const newArray = todoData.with(index, newItem);
			return {
				todoData: newArray
			}
		});
	};


	filterItems = (todoData, filter) => {
		switch (filter) {
			case 'active':
				return todoData.filter((item) => !item.done);
			case 'completed':
				return todoData.filter((item) => item.done);
			default:
				return todoData;
		}
	}

	setFilter = (newFilter) => {
		this.setState({ filter: newFilter })
	}

	deleteAllCompletedItems = () => {
		this.setState(({ todoData }) => {
			const newArray = todoData.filter(item => !item.done);
			return {
				todoData: newArray
			}
		})
	}

	render() {
		const { todoData, filter } = this.state
		const visibleItems = this.filterItems(todoData, filter);

		const doneCount = todoData.filter(el => el.done).length;
		const todoCount = todoData.length - doneCount;

		return (
			<section className="todoapp">
				<NewTaskForm onItemAdded={this.addItem} />
				<section className="main">
					<TaskList
						todos={visibleItems}
						onDeleted={this.deleteItem}
						onToggleDone={this.onToggleDone}
					/>
					<Footer
						toDo={todoCount}
						filter={filter}
						onFilterChange={this.setFilter}
						onDeleteAllCompleted={this.deleteAllCompletedItems}
					/>
				</section>
			</section>
		)
	}
}