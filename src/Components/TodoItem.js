import React from 'react'


export default function TodoItem({ todo, removeTodo }){

    const handleDelete = () => {
        removeTodo(todo.id)
    }

    return(
        <li className="todo-item">
            <div className="columns">
                <h3>Title:</h3>
                <h2>{todo.title}</h2>
            </div>
            <div className="columns">
                <h3>Desc.:</h3>
                <p>{todo.description}</p>
            </div>
            <div className="columns">
                <h3>Due Date:</h3>
                <p>{todo.due_date}</p>
            </div>
            <div className="columns">
                <h3>Location:</h3>
                <p>{todo.address}</p>
            </div>
            <button>Update</button>
            <button onClick={handleDelete}>Delete</button>

        </li>
    )
}
