import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from '../List/List';
import User from '../User/User';
import Summary from '../Summary/Summary';
import { useGetUsersQuery } from '../../api/users';
import { useGetTodosQuery } from '../../api/todos';
import './App.css';

function App() {
  const { data: users = [], isLoading: areUsersLoading } = useGetUsersQuery();
  const { data: todos = [], isLoading: areTodosLoading } = useGetTodosQuery();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List users={users} areUsersLoading={areUsersLoading} />} />
        <Route path="users/:id" element={<User users={users} areUsersLoading={areUsersLoading} />} />
        <Route path="summary" element={
          <Summary
            users={users}
            todos={todos}
            areUsersLoading={areUsersLoading}
            areTodosLoading={areTodosLoading}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
