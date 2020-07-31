import React from 'react'
import TodoItem from './TodoItem'


export default function TodoContainer({ todos, removeTodo }) {

    const todoList = () => {
        return todos.map(todo => {
            return <TodoItem key={todo.id} todo={ todo } removeTodo={removeTodo}/> 
        })
    }

    return(
        <div className="todo-container">
            <h2>Current List of todos</h2>
            <ul className='todo-list'>
            
                { todoList() }
            </ul>
        </div>
    )
}