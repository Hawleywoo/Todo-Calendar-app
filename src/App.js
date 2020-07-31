import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import TodoContainer from './Components/TodoContainer'
import MapContainer from './Components/MapContainer';
import Calendar from './Components/Calendar';
import TodoForm from './Components/TodoForm';




class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/todos')
    .then(response => response.json())
    .then(result => this.setState({todos: result}))
  }

  addTodo = (newTodo) => {
    this.postTodo({...newTodo})
  }

  removeTodo = (todoToRemove) => {
    let filtered = this.state.todos.filter( todo => {
      return todo.id !== todoToRemove
    })

    this.setState({
      todos: filtered
    })

    fetch(`http://localhost:3000/todos/${todoToRemove}`, {
      method: "DELETE"
    })
  }
  
  postTodo = (todo) => {
    console.log(todo)
    fetch('http://localhost:3000/todos', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(repsonse => repsonse.json())
    .then(result => {
      this.setState({
        todos: [...this.state.todos, {...result}]
      })
    })
  }

  render(){
  
    return (
      <Router>
        <div className="App">
          <header>
            <section className='wave'>
              <div className="headers">
                <h1>Todos With Benefits</h1>
                <nav>
                  <Link to='/map'>Map</Link> 
                  <Link to='/calendar'>Calendar</Link> 
                  <Link to='/'>Todos</Link> 
                  
                </nav>
              </div>
            </section>
          </header>
            <TodoForm addTodo={this.addTodo}/>

          <Switch>
            <Route path='/calendar'>
              <Calendar todos={this.state.todos}/>
            </Route>
            <Route path='/map'>
              <MapContainer  todos={this.state.todos} />
            </Route>
            <Route path='/'>
              <div className="todo-parent">
                <TodoContainer todos={this.state.todos} removeTodo={this.removeTodo}/>

              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
