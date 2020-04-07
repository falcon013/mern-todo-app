import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";

import logo from "./logo.svg"


class App extends Component {
    render() {
        return (
            <Router>
            <div className="container">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a className="navbar-brand" href="http://localhost:63342/mariapaderina.github.io/">
                    <img src={logo} width="30" height="30" alt=""/>
                    </a>
                    <Link to="/" className="navbar-brand">MERN Stack Todo App</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Todos</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Todo</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/" exact component={TodosList}/>
                <Route path="/edit/:id" component={EditTodo}/>
                <Route path="/create" component={CreateTodo}/>
            </div>
            </Router>
        );
    }
}
export default App;



// with axios we send http requests from front end app to our server
