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

  .online {
    background-color: #77dd77;
    color: #fff;
  }

  .offline {
    background-color: #ff6961;
    color: #fff;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 150px;
  background-color: white;
`;

const FlipCardWrapper = styled.div`
  background-color: transparent;
  width: 190px;
  height: 254px;
  perspective: 1000px;
  font-family: sans-serif;
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  margin: 0;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  ${FlipCardWrapper}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid coral;
  border-radius: 1rem;
  background: linear-gradient(
    120deg,
    bisque 60%,
    rgb(255, 231, 222) 88%,
    rgb(255, 211, 195) 40%,
    rgba(255, 127, 80, 0.603) 48%
  );
  color: coral;
`;

const FlipCardBack = styled.div`
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid coral;
  border-radius: 1rem;
  background: linear-gradient(
    120deg,
    rgb(255, 174, 145) 30%,
    coral 88%,
    bisque 40%,
    rgb(255, 185, 160) 78%
  );
  color: white;
  transform: rotateY(180deg);
`;

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const res = await axios.get('users/userList');
        setUsers(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUsersList();
  }, []);

  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Navbar />
        <CardWrapper>
          <FlipCardWrapper>
            <FlipCardInner>
              <FlipCardFront>
                <Title className="title">Total Users</Title>
                <h3>{users.length}</h3>
              </FlipCardFront>
              <FlipCardBack>
                <Title className="title">Blocked</Title>
                <h3>3</h3>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCardWrapper>
          <FlipCardWrapper>
            <FlipCardInner>
              <FlipCardFront>
                <Title className="title">Visitors</Title>
                <h3>125</h3>
              </FlipCardFront>
              <FlipCardBack>
                <Title className="title">Visitors</Title>
                <h3>125</h3>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCardWrapper>
          <FlipCardWrapper>
            <FlipCardInner>
              <FlipCardFront>
                <Title className="title">Videos</Title>
                <h3>24</h3>
              </FlipCardFront>
              <FlipCardBack>
                <Title className="title">Videos</Title>
                <h3>24</h3>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCardWrapper>
          <FlipCardWrapper>
            <FlipCardInner>
              <FlipCardFront>
                <Title className="title">Reported User</Title>
                <h3>3</h3>
              </FlipCardFront>
              <FlipCardBack>
                <Title className="title">Reported Videos</Title>
                <h3>5</h3>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCardWrapper>
        </CardWrapper>
        <TableContainer>
          <thead>
            <TableRow>
              <TableHeader>Index</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <button className={user.online ? 'online' : 'offline'}>
                    {user.online ? 'Online' : 'Offline'}
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

export default AdminPage;
