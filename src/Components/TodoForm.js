import React from 'react'

const initialState = {
        title: '',
        description: '',
        due_date: '',
        address: ''
}

export default class TodoForm extends React.Component{
    state = {
        title: '',
        description: '',
        due_date: '',
        address: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addTodo(this.state)
        this.resetState()
    }

    handleChange = (event) => {
        const { name } = event.target
        let value = event.target.value
        this.setState({
            [name]: value
        })
    }

    resetState = () => {
        this.setState(initialState)
    }

    render(){
        return(
            <div className="todoForm-container" >
                <h2 className="todo-header">Add a New Todo!</h2>
                <form className="todoForm" onSubmit={this.handleSubmit}>
                    <input 
                        name='title'
                        onChange={this.handleChange}
                        value={this.state.title} 
                        placeholder="Task's Title:"
                    />
                    <input 
                        name='description'
                        onChange={this.handleChange} 
                        value={this.state.descriptino} 
                        placeholder="Task's Description:"
                    />
                    <input 
                        type='date' 
                        name='due_date'
                        onChange={this.handleChange} 
                        value={this.state.due_date} 
                    />
                    <input 
                        name='address'
                        onChange={this.handleChange} 
                        value={this.state.address} 
                        placeholder="Task's Address:"
                    />
                    <input type='submit' placeholder="Add Todo"/>
                </form>
            </div>
        )
    }
}