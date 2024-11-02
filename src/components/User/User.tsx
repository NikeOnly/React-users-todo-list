import React from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useDeleteTodoMutation } from '../../api/todos';
import { Users } from '../../types/user.types';
import { Todos } from '../../types/todos.types';

function User({ users, todos }: { users: Users, todos: Todos }) {
  const { id } = useParams();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const currentUser = users.find((user) => String(user.id) === id);
  const currentUserTodos = todos?.filter((todo) => String(todo.userId) === id);

  const onDeleteTodoClick = (id: number) => deleteTodo(id);

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <div>User {id}</div>
            <div>{currentUser?.name}</div>
          </div>
          <ListGroup>
            {currentUserTodos.map((todo) => 
              <ListGroup.Item key={todo.id}>
                {todo.title} 
                <Button onClick={() => onDeleteTodoClick(todo.id)}>Delete</Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default User;