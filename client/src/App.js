import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AcceptInvitation from './components/AcceptInvitation';
import ExpenseManagement from './components/ExpenseManagement';

const App = () => {
  const token = localStorage.getItem('token');

  return (
      <Routes>
        <Route path="/*" element={token ? <Home /> : <Navigate to='/login' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/group/invitation/accept" element={token ? <AcceptInvitation /> :  <Navigate to='/login' />} />
        <Route path="/group-expense/:groupId" element={token ? <ExpenseManagement /> :  <Navigate to='/login' />} />
      </Routes>
  )
}

export default App