import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Todo } from '../../types/todos.types';
import './UserTodo.css';

function UserTodo(
  { 
    todo,
    deleteTodo,
    editId,
    setEditId,
    editTodo,
  }: {
    todo: Todo,
    deleteTodo: (id: number) => void,
    editId: number,
    setEditId: (id: number) => void,
    editTodo: ({ id, body }: { id: number, body: Todo}) => void,
  }
) {
  const [text, setText] = useState(todo.title);
  const isEditing = editId === todo.id;

  const onDeleteTodoClick = (id: number) => deleteTodo(id);

  const onEditTodoClick = (id: number) => setEditId(id);

  const onSaveTodoClick = () => {
    editTodo({ 
      id: todo.id, 
      body: {
        ...todo,
        title: text,
      }
    });
    setEditId(0);
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <ListGroup.Item className="user-todo">
      {isEditing ? (
        <Form.Control
          type="text"
          id="inputTodo"
          aria-describedby="todoHelpBlock"
          onChange={onInputChange}
          value={text}
          className="user-todo-text"
        />
      ) : (
        <div className="user-todo-text">{todo.title}</div>
      )}

      {isEditing ? (
        <Button className="user-todo-button" onClick={() => onSaveTodoClick()}>Save</Button>
      ) : (
        <Button className="user-todo-button" onClick={() => onEditTodoClick(todo.id)}>Edit</Button>
      )}
      <Button className="user-todo-button" onClick={() => onDeleteTodoClick(todo.id)}>Delete</Button>
    </ListGroup.Item>
  );
}

export default UserTodo;