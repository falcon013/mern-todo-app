import React, { Component } from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';

class TodoRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete('http://localhost:4000/todos/'+ this.props.todo._id)
            .then(console.log('Deleted todo'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <tr>
                <td className={this.props.todo.completed ? 'completed' : ''}>
                    {this.props.todo.description}
                </td>
                <td className={this.props.todo.completed ? 'completed' : ''}>
                    {this.props.todo.responsible}
                </td>
                <td className={this.props.todo.completed ? 'completed' : ''}>
                    {this.props.todo.priority}
                </td>
                <td>
                    <Link to={"/edit/"+ this.props.todo._id}>Edit</Link>
                    <button className="btn btn-danger ml-5"  onClick={this.delete} >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}
export default TodoRow;
