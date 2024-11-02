import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Users } from '../../types/user.types';

function List({ users }: { users: Users }) {
  const navigate = useNavigate();
  const onUserClick = (id: number) => {
    navigate(`/users/${id}`);
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>List of users to login with:</div>
          <ListGroup>
            {users?.map((user) => 
              <ListGroup.Item key={user.id} onClick={() => onUserClick(user.id)}>
                {user.name}
              </ListGroup.Item>
            )}
          </ListGroup>
          <Link to='/summary'>Summary</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default List;