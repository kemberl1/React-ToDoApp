//верхний компонент
import TaskList from "./components/TaskList/TaskList";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import Footer from "./components/Footer/Footer"
import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {

	state = {
		todoData: [
			this.createToDoItem('Drink Coffee'),
			this.createToDoItem('Sleep')
		]
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
			const newArray = todoData.map(item => {
				if (item.id === id) {
					return { ...item, done: !item.done };
				}
				return item;
			});
			return { todoData: newArray };
		});
	};

	render() {
		const { todoData } = this.state

		const doneCount = todoData.filter(el => el.done).length;
		const todoCount = todoData.length - doneCount;

		return (
			<section className="todoapp">
				<NewTaskForm onItemAdded={this.addItem} />
				<section className="main">
					<TaskList
						todos={todoData}
						onDeleted={this.deleteItem}
						onToggleDone={this.onToggleDone}
					/>
					<Footer toDo={todoCount} />
				</section>
			</section>
		)
	}
}