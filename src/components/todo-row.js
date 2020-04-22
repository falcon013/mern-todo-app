import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TodoRow extends Component {

    render() {
        let onDeleteHandle = this.props.onDelete;

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
                <td className="buttons">
                    <Link style={{marginRight: 7}} to={"/edit/" + this.props.todo._id}>Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => onDeleteHandle(this.props.todo._id)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default TodoRow;
