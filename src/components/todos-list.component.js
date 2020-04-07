import React, {Component} from 'react';
import axios from "axios";
import TodoRow from "./TodoRow"

export default class  TodosList extends Component {

    constructor(props) {                  //props of Component
        super(props);
        this.state = {todos: []};     //initial state object
    }
                                       // retrieve todos from DB
    componentDidMount() {
        axios.get('http://localhost:4000/todos/')   // request to API that created (routes) on server side
             .then (response => {
                this.setState({todos: response.data})
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    componentDidUpdate = () => {
        axios.get('http://localhost:4000/todos/')   // request to API that created (routes) on server side
            .then (response => {
                this.setState({todos: response.data})
            })
            .catch(function (error) {
                console.log(error)
            })
    };

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <TodoRow todo={currentTodo} key={i}/>;
        });
    }


    render() {
        return (
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
