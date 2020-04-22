import React, {Component} from 'react';
import axios from "axios";
import TodoRow from "./todo-row";

export default class TodosList extends Component {

    constructor(props) {                  //props of Component
        super(props);
        this.state = {todos: []};     //initial state object
        this.deleteTodo = this.deleteTodo.bind(this);

    }

    // retrieve todos from DB
    componentDidMount() {
        this.getLatestState();
    }

    getLatestState(priority) {
        let getTodosUrl = 'http://localhost:4000/todos/'
        if (priority) {
            if (priority !== 'All') {
                getTodosUrl += `?priority=${priority}`
                console.log(getTodosUrl)
            }
        }
        // request to API that created (routes) on server side
        axios.get(getTodosUrl)
            .then(response => {
                this.setState({todos: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    deleteTodo(id) {
        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(res => {
                console.log(`Todo id: ${id} deleted`);
                this.getLatestState();
            })
            .catch(err => console.log(err))
    }

    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <TodoRow todo={currentTodo} key={i} onDelete={this.deleteTodo}/>;
        });
    }


    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Todo List</h3>
                <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                    <label className="btn btn-outline-info active">
                        <input type="radio" name="options" id="option1" value="High"
                               onClick={e => this.getLatestState(e.target.value)} autoComplete="off"/> High
                    </label>
                    <label className="btn btn-outline-info">
                        <input type="radio" name="options" id="option2" value="Medium"
                               onClick={e => this.getLatestState(e.target.value)} autoComplete="off"/> Medium
                    </label>
                    <label className="btn btn-outline-info">
                        <input type="radio" name="options" id="option3" value="Low"
                               onClick={e => this.getLatestState(e.target.value)} autoComplete="off"/> Low
                    </label>
                    <label className="btn btn-outline-info">
                        <input type="radio" name="options" id="option4" value="All"
                               onClick={e => this.getLatestState(e.target.value)} autoComplete="off"
                               defaultChecked/> All
                    </label>
                </div>

                <table className="table table-dark striped bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
