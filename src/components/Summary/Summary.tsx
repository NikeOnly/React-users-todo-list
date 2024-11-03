import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Users } from '../../types/user.types';
import { Todos } from '../../types/todos.types';
import './Summary.css';

function Summary({ users, todos }: { users: Users, todos: Todos }) {
  return (
    <Container>
      <Row>
        <Col>
          <Link to='/' className="link">
            <Button className="summary-back-button">
              Go back
            </Button>
          </Link>
          <h2 className="title">Summary</h2>
          <ListGroup>
            {users.map((user) => {
              const userTodos = todos.filter((todo) => todo.userId === user.id);
              const completeTodos = userTodos.filter((todo) => todo.completed);
              const incompleteTodos = userTodos.filter((todo) => !todo.completed);
              return (
                <ListGroup.Item key={user.id}>
                  <Row>
                    <Col>
                      <div>{user.name}</div>
                    </Col>
                    <Col>
                      <div>Todos:</div>
                      <div>Complete: {completeTodos.length}</div>
                      <div>Incomplete: {incompleteTodos.length}</div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Summary;