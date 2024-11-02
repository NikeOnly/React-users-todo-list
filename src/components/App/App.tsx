import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from '../List/List';
import User from '../User/User';
import Summary from '../Summary/Summary';
import { useGetUsersQuery } from '../../api/users';
import { useGetTodosQuery } from '../../api/todos';
import './App.css';

function App() {
  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery();
  const { data: todos = [], isLoading: isTodosLoading } = useGetTodosQuery();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List users={users} />} />
        <Route path="users/:id" element={<User users={users} todos={todos} />} />
        <Route path="summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
