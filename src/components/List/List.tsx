import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Loader from '../Loader/Loader';
import { Users } from '../../types/user.types';
import './List.css';

function List({ users, areUsersLoading }: { users: Users, areUsersLoading: boolean }) {
  const navigate = useNavigate();
  const onUserClick = (id: number) => {
    navigate(`/users/${id}`);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="title">Choose user to login with.</h2>
          <h4 className="list-description">You will be able to see and modify user's todo list.</h4>
          <h4 className="list-description">You can see todos completion summary by clicking button below.</h4>
          <Link to='/summary' className="link">
            <Button className="list-summary-button">
              User todos summary
            </Button>
          </Link>
          {areUsersLoading ? <Loader /> : (
            <ListGroup>
              {users?.map((user) => 
                <ListGroup.Item key={user.id} className="list-user" onClick={() => onUserClick(user.id)}>
                  {user.name}
                </ListGroup.Item>
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default List;