import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            completed: false
        }
    }

    componentDidMount() {
        // get request to server to retrieve  specific by id t0do from DB
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    responsible: response.data.responsible,
                    priority: response.data.priority,
                    completed: response.data.completed
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onChangeTodoDescription(e) {           // event handler
        this.setState({               // reset state
            description: e.target.value    // set value from input form
        })
    }
    onChangeTodoResponsible(e) {
        this.setState({
            responsible: e.target.value
        })
    }
    onChangeTodoPriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeTodoCompleted(e) {
        this.setState({
            completed:  !this.state.completed
        });
    }
    // send updated object to server DB for updating.
    onSubmit (e) {
        e.preventDefault();
        const obj = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed:this.state.completed
        }
        axios.post(' http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data))
        // return to default routes to the list of all todos
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
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
                        <div className="form-check">
                            <input type="checkbox"
                                   className="form-check-input"
                                   id="completedCheckbox"
                                   name="completedCheckbox"
                                   onChange={this.onChangeTodoCompleted}
                                   checked={this.state.completed === true}
                                   value={this.state.completed}
                            />
                            <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit"
                                   value="Update todo"
                                   className="btn btn-outline-primary"
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
