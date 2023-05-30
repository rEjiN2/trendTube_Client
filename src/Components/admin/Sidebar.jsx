import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  background-color: #307236;
  width: 200px;
  height: 100vh;
  align-items:center;
  justify-content:center;
  padding: 0px;
  position:sticky;
  top: 0;
`;

const SidebarTitle = styled.h1`
  font-size: 1.7rem;
  color: #333;
  margin-bottom: 20px;
  align-items:center;
  padding:20px;
`;



const SidebarLink = styled.h5`
  display: block;
  color: white;
  margin-bottom: 10px;
  text-decoration: none;
  padding:20px;
  cursor:pointer;
  border-bottom: 1px solid #999;
  &:hover {
    color: #000;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>Admin</SidebarTitle>
      <Link to="/admin/adminHome">

      <SidebarLink href="#">User</SidebarLink>
      </Link>
      <Link to="/admin/verifyVideo">
      <SidebarLink>Verify Video</SidebarLink>
     </Link>
     <Link to="/admin/reportUser">

      <SidebarLink >Report User</SidebarLink>
     </Link>
     <Link to="/admin/reportVideo">
     <SidebarLink >Reported Video</SidebarLink>
     </Link>
      <SidebarLink href="#">Contact</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
