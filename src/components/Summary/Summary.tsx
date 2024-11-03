import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Loader from '../Loader/Loader';
import SummaryGrid from '../SummaryGrid/SummaryGrid';
import { Users } from '../../types/user.types';
import { Todos } from '../../types/todos.types';
import './Summary.css';


function Summary({
  users,
  todos,
  areUsersLoading,
  areTodosLoading,
}: {
  users: Users,
  todos: Todos,
  areUsersLoading: boolean,
  areTodosLoading: boolean,
}) {
  const userData = useMemo(() => users.map((user) => {
    const userTodos = todos.filter((todo) => todo.userId === user.id);
    const completeTodos = userTodos.filter((todo) => todo.completed);
    const incompleteTodos = userTodos.filter((todo) => !todo.completed);

    return ({
      name: user.name,
      complete: completeTodos.length,
      incomplete: incompleteTodos.length,
    });
  }), [users]);

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
          {(areUsersLoading || areTodosLoading) ? <Loader /> : <SummaryGrid userData={userData} />}
        </Col>
      </Row>
    </Container>
  );
}

export default Summary;