import React from 'react';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],      // load from localStorage in componentDidMount
      input: ''
    };
  }

  componentDidMount() {
    // Load todos from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Save todos to localStorage whenever todos change
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  addTodo = () => {
    const { input, todos } = this.state;
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };

    this.setState({
      todos: [...todos, newTodo],
      input: ''
    });
  };

  toggleComplete = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  deleteTodo = (id) => {
    const filteredTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: filteredTodos });
  };

  render() {
    const containerStyle = {
      maxWidth: 450,
      margin: '50px auto',
      padding: 30,
      borderRadius: 12,
      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      color: 'white',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const inputStyle = {
      padding: '12px 16px',
      width: '70%',
      borderRadius: 30,
      border: 'none',
      outline: 'none',
      fontSize: 16,
      marginRight: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    };

    const addButtonStyle = {
      padding: '12px 24px',
      borderRadius: 30,
      border: 'none',
      backgroundColor: '#ff6b6b',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'background-color 0.3s ease',
    };

    const todoListStyle = {
      listStyle: 'none',
      padding: 0,
      marginTop: 30,
      maxHeight: 300,
      overflowY: 'auto',
    };

    const todoItemStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      marginBottom: 14,
      borderRadius: 10,
      padding: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    };

    const todoTextStyle = (completed) => ({
      flexGrow: 1,
      marginLeft: 15,
      fontSize: 18,
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? '#d1d1d1' : 'white',
      transition: 'color 0.3s ease',
    });

    const deleteButtonStyle = {
      marginLeft: 15,
      background: 'transparent',
      border: 'none',
      color: '#ff6b6b',
      fontWeight: 'bold',
      fontSize: 16,
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    };

    return (
      <div style={containerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 30, fontWeight: '900' }}>
        To-Do List
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Add a new task..."
            style={inputStyle}
          />
          <button
            style={addButtonStyle}
            onClick={this.addTodo}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ff4757')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#ff6b6b')}
          >
            Add
          </button>
        </div>

        <ul style={todoListStyle}>
          {this.state.todos.map(todo => (
            <li key={todo.id} style={todoItemStyle}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => this.toggleComplete(todo.id)}
                style={{ width: 20, height: 20, cursor: 'pointer' }}
              />
              <span style={todoTextStyle(todo.completed)}>{todo.text}</span>
              <button
                onClick={() => this.deleteTodo(todo.id)}
                style={deleteButtonStyle}
                onMouseOver={e => (e.currentTarget.style.color = '#ff4757')}
                onMouseOut={e => (e.currentTarget.style.color = '#ff6b6b')}
                title="Delete task"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
