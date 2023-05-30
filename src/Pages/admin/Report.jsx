import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../Components/admin/Sidebar';
import Navbar from '../../Components/admin/Navbar';
import axios from '../../utils/axios';

const PageContainer = styled.div`
  display: flex;
  background-color: #808080;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 0px;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 10px;
  }

  .block {
    background-color: #ff6961;
    color: #fff;
  }

  .unblock {
    background-color: #77dd77;
    color: #fff;
  }
`;

const Report = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const res = await axios.get('users/userList');
        const storedSuspendedUsers = JSON.parse(localStorage.getItem('suspendedUsers')) || [];

        const updatedUsers = res.data.map(user => ({
          ...user,
          suspended: storedSuspendedUsers.includes(user._id) 
        }));
        setUsers(updatedUsers);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUsersList();
  }, []);

  const handleSuspend = async (userId) => {
    try {
      
      await axios.put(`users/suspend/${userId}`);
      
      
      setUsers(prevUsers => prevUsers.map(user => {
        if (user._id === userId) {
          return { ...user, suspended: true };
        }
        return user;
      }));

     
      const storedSuspendedUsers = JSON.parse(localStorage.getItem('suspendedUsers')) || [];
      localStorage.setItem('suspendedUsers', JSON.stringify([...storedSuspendedUsers, userId]));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      
      await axios.delete(`users/${userId}`);
      
      
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));

      
      const storedSuspendedUsers = JSON.parse(localStorage.getItem('suspendedUsers')) || [];
      const updatedSuspendedUsers = storedSuspendedUsers.filter(id => id !== userId);
      localStorage.setItem('suspendedUsers', JSON.stringify(updatedSuspendedUsers));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Navbar />
        <TableContainer>
          <thead>
            <TableRow>
              <TableHeader>Index</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Report</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.report}</TableCell>
                <TableCell>
                  {user.suspended ? (
                    <button className="block">Suspended</button>
                  ) : (
                    <button className="block" onClick={() => handleSuspend(user._id)}>
                      Suspend
                    </button>
                  )}
                  <button className="unblock" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Report;

