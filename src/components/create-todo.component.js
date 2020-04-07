import React, {Component} from 'react';
import axios from "axios";             // with axios we send http requests from frontend app (from form) to our server

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);
                                        // get access to state with our methods
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            completed: false
        }
    }

    onChangeTodoDescription (e) {            // update properties
        this.setState({
            description: e.target.value
        })
    }
    onChangeTodoResponsible (e) {
        this.setState({
            responsible: e.target.value
        })
    }
    onChangeTodoPriority (e) {
        this.setState({
            priority: e.target.value
        })
    }

    onSubmit (e) {
        e.preventDefault();
        console.log(`Todo description: ${this.state.description}`)

        // http post request with created newTodo (contains values from form) and send  from user to server

        const newTodo = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed
        }
        axios.post(' http://localhost:4000/todos/add', newTodo) // request to API on server
            .then(res => console.log(res.data));


        this.setState({         // reset props after submit form, clear state object
            description: '',
            responsible: '',
            priority: '',
            completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop:20}}>
                <h3>Create a new todo</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.responsible}
                               onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                   className="form-check-input"
                                   name="priorityOptions"
                                   id="priorityLow"
                                   value="Low"
                                   checked={this.state.priority === 'Low'}
                                   onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                   className="form-check-input"
                                   name="priorityOptions"
                                   id="priorityMedium"
                                   value="Medium"
                                   checked={this.state.priority === 'Medium'}
                                   onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                   className="form-check-input"
                                   name="priorityOptions"
                                   id="priorityHigh"
                                   value="High"
                                   checked={this.state.priority === 'High'}
                                   onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-outline-primary" />

                    </div>

                </form>
            </div>
        )
    }
}
