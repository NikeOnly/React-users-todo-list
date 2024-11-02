import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetUsersQuery } from '../../api/users';
import { useGetTodosQuery } from '../../api/todos';

function Summary() {
  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery();
  const { data: todos = [], isLoading: isTodosLoading } = useGetTodosQuery();
  return (
    <Container>
      <Row>
        <Col>
          <div>Summary</div>
          {users.map((user) => {
            const userTodos = todos.filter((todo) => todo.userId === user.id);
            const completeTodos = userTodos.filter((todo) => todo.completed);
            const incompleteTodos = userTodos.filter((todo) => !todo.completed);
            return (
              <div key={user.id}>
                <div>{user.name}</div>
                <div>Todos:</div>
                <div>Complete: {completeTodos.length}</div>
                <div>Incomplete: {incompleteTodos.length}</div>
              </div>
            );
          }
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Summary;