import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import UserTodo from '../UserTodo/UserTodo';
import Loader from '../Loader/Loader';
import {
  useDeleteTodoMutation,
  useAddTodoMutation,
  useEditTodoMutation,
  useGetUserTodosQuery
} from '../../api/todos';
import { Users } from '../../types/user.types';
import './User.css';

function User({ users, areUsersLoading }: { users: Users, areUsersLoading: boolean }) {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(0);
  const { data: userTodos = [], isLoading: areUserTodosLoading } = useGetUserTodosQuery(id as string);
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const [editTodo, { isLoading: isEditing }] = useEditTodoMutation();
  const isLoading = isDeleting || isAdding || isEditing || areUsersLoading || areUserTodosLoading;

  const currentUser = users.find((user) => String(user.id) === id);
  const userName = currentUser?.name || 'A';

  const onAddTodoClick = () => {
    addTodo({
      title: text,
      userId: Number(id),
      completed: false,
    });
    setText('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <Container>
      <Row>
        <Col>
          <Link to='/' className="link">
            <Button className="user-back-button">
              Go back
            </Button>
          </Link>
        </Col>
        <Col>
          <div className="user-container">
            <div className="user-name">{userName}</div>
            <div className="user-logo">{userName.charAt(0)}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label htmlFor="inputTodo">Add todo:</Form.Label>
          <div className="user-input-container">
            <Form.Control
              type="text"
              id="inputTodo"
              aria-describedby="todoHelpBlock"
              onChange={onInputChange}
              value={text}
            />
            <Button className="user-add-button" onClick={onAddTodoClick}>Add</Button>
          </div>
          {isLoading ? <Loader /> : (
            <ListGroup>
              {userTodos.map((todo) => 
                <UserTodo
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  editId={editId}
                  setEditId={setEditId}
                  editTodo={editTodo}
                />
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default User;