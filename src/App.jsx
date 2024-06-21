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

  static createToDoItem = ({ label, minutes, seconds }) => {
    const newId = uuidv4()
    return {
      label,
      id: newId,
      done: false,
      createdDate: new Date(),
      minutes: parseInt(minutes, 10),
      seconds: parseInt(seconds, 10),
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      filter: 'all',
      timers: {},
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData, timers }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const newArray = todoData.toSpliced(index, 1)
      clearInterval(timers[id].timerInterval)
      const newTimers = { ...timers }
      delete newTimers[id]
      return {
        todoData: newArray,
        timers: newTimers,
      }
    })
  }

  addItem = (label, minutes, seconds) => {
    const newItem = App.createToDoItem({ label, minutes, seconds })
    this.setState(({ todoData, timers }) => {
      const newTimers = this.setupTimer(timers, newItem.id)
      const newArray = todoData.concat(newItem)
      return { todoData: newArray, timers: newTimers }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData, timers }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const task = todoData[index]
      const newTask = { ...task, done: !task.done }
      const newArray = todoData.with(index, newTask)

      let newTimers = { ...timers }
      if (newTask.done) {
        clearInterval(newTimers[id].timerInterval)
        newTimers = {
          ...newTimers,
          [id]: {
            ...newTimers[id],
            timerRunning: false,
          },
        }
      } else {
        newTimers = this.setupTimer(newTimers, id)
      }

      return {
        todoData: newArray,
        timers: newTimers,
      }
    })
  }

  changeFilter = (filter) => {
    this.setState({ filter })
  }

  deleteAllCompletedItems = () => {
    this.setState(({ todoData, timers }) => {
      const newArray = todoData.filter((item) => !item.done)
      const newTimers = { ...timers }
      todoData.forEach((item) => {
        if (item.done) {
          clearInterval(newTimers[item.id]?.timerInterval)
          delete newTimers[item.id]
        }
      })
      return {
        todoData: newArray,
        timers: newTimers,
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

  setupTimer = (timers, id) => {
    const newTimers = {
      ...timers,
      [id]: {
        ...timers[id],
        timerRunning: true,
        timerInterval: setInterval(() => {
          this.decrementTimer(id)
        }, 1000),
      },
    }
    return newTimers
  }

  startTimer = (id) => {
    const { todoData, timers } = this.state
    const task = todoData.find((item) => item.id === id)
    if (!task || task.done) {
      return
    }
    if (!timers[id] || !timers[id].timerRunning) {
      const newTimers = this.setupTimer(timers, id)
      this.setState({ timers: newTimers })
    }
  }

  pauseTimer = (id) => {
    const { timers } = this.state
    if (timers[id] && timers[id].timerRunning) {
      clearInterval(timers[id].timerInterval)
      const newTimers = {
        ...timers,
        [id]: {
          ...timers[id],
          timerRunning: false,
        },
      }
      this.setState({ timers: newTimers })
    }
  }

  decrementTimer = (id) => {
    this.setState(({ todoData, timers }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const task = todoData[index]
      let { minutes, seconds } = task

      if (minutes === 0 && seconds === 0) {
        this.pauseTimer(id)
      } else if (seconds === 0) {
        minutes -= 1
        seconds = 59
      } else {
        seconds -= 1
      }

      const newTask = { ...task, minutes, seconds }
      const newArray = todoData.with(index, newTask)
      const newTimers = { ...timers }
      newTimers[id] = {
        ...newTimers[id],
        minutes,
        seconds,
      }

      return {
        todoData: newArray,
        timers: newTimers,
      }
    })
  }

  render() {
    const { todoData, filter, timers } = this.state
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
            timers={timers}
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
          />
          <Footer
            toDo={todoCount}
            filter={filter}
            onFilterChange={this.changeFilter}
            onDeleteAllCompleted={this.deleteAllCompletedItems}
          />
        </section>
      </section>
    )
  }
}
