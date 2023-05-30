import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #4caf50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px;
`;

const Logo = styled.h1`
  font-size: 1.7rem;
  color: #333;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
    color: #333;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PopupTitle = styled.h3`
  color: #4caf50;
  margin-bottom: 10px;
`;

const PopupButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #45a245;
  }
`;

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <NavbarContainer>
        <Logo></Logo>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavbarContainer>
      {showPopup && (
        <Popup>
          <PopupTitle>Are you sure you want to logout?</PopupTitle>
          <PopupButton onClick={closePopup}>Cancel</PopupButton>
          <PopupButton>Logout</PopupButton>
        </Popup>
      )}
    </>
  );
};

export default Navbar;
