// App.jsx
import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskList from './components/TaskList/TaskList'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Footer from './components/Footer/Footer'

export default class App extends Component {
  static filterItems = (todoData, filter) => {
    switch (filter) {
      case 'active':
        return todoData.filter((item) => !item.done)
      case 'completed':
        return todoData.filter((item) => item.done)
      default:
        return todoData
    }
  }

  static createToDoItem({ label, minutes, seconds }) {
    const newId = uuidv4()
    return {
      label,
      id: newId,
      done: false,
      createdDate: new Date(),
      minutes,
      seconds,
    }
  }

  constructor(props) {
    super(props)
    this.state = { todoData: [], filter: 'all' }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const newArray = todoData.toSpliced(index, 1)
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (label, minutes, seconds) => {
    const newItem = App.createToDoItem({ label, minutes, seconds })
    this.setState(({ todoData }) => {
      const newArray = todoData.concat(newItem)
      return { todoData: newArray }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, done: !oldItem.done }
      const newArray = todoData.with(index, newItem)
      return {
        todoData: newArray,
      }
    })
  }

  setFilter = (newFilter) => {
    this.setState({ filter: newFilter })
  }

  deleteAllCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.done)
      return {
        todoData: newArray,
      }
    })
  }

  onEditItem = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, label: newLabel }
      const newArray = todoData.with(index, newItem)
      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const { todoData, filter } = this.state
    const visibleItems = App.filterItems(todoData, filter)

    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEditItem}
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
