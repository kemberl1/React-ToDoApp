//форма для добавления

import { Component } from "react"

export default class NewTaskForm extends Component {
	constructor(){
	super()
	this.searchText = 'What needs to be done?';
	}

	handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.onItemAdded('hello world');
    }
  };

	render() {
	return (
		<header className="header">
			<h1>todos</h1>
			<input 
			className="new-todo" 
			placeholder={this.searchText} 
			autoFocus 
			onKeyDown={ this.handleKeyDown }/>
		</header>
	)
}
}