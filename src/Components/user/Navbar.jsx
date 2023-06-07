import React, { useState, useEffect } from 'react';
import styled,{ keyframes } from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import axios from '../../utils/axios';
import { logout } from '../../redux/userSlice';
import Upload from './Upload';
import Profile from './Profile';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 75px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  cursor: pointer;
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const UserName = styled.h5`
  cursor: pointer;
`;

const StyledButton = styled.button`
  width: 10em;
  position: relative;
  height: 3.5em;
  border: 3px ridge #149CEA;
  outline: none;
  background-color: transparent;
  color: white;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
  
  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #212121;
    transition: 0.5s;
    transform-origin: center;
  }
  
  &::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #212121;
    transition: 0.5s;
  }
  
  &:hover::before,
  &:hover::after {
    transform: scale(0);
  }
  
  &:hover {
    box-shadow: inset 0px 0px 25px #1479EA;
  }
`;


const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 260px;
  background-color: ${({ theme }) => theme.bgLighter};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const NotificationsIcon = styled(NotificationsActiveOutlinedIcon)`
  cursor: pointer;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
`;

const NotificationCount = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SearchInputStyled = styled.input`
  width: 350px; /* Adjust the width as needed */
  height: 100%;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  background-color: #53535f;
  caret-color: #f7f7f8;
  color: #fff;
  padding: 7px 10px;
  border: 2px solid transparent;
  border-radius: 7px;
  margin-right: 1px;
  transition: all 0.2s ease;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.16);
  }

  &:focus {
    border: 2px solid #a970ff;
    background-color: #0e0e10;
  }
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: rgba(42, 42, 45, 1);
  border-radius: 7px;
  height: 100%;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(54, 54, 56, 1);
  }
`;
const shake = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;
const Button = styled.button`
  height: 3em;
  width: 8em;
  border: none;
  border-radius: 10em;
  background: #016DD9;
  font-size: 17px;
  color: #ffffff;
  font-family: inherit;
  font-weight: 500;
  
  &:hover {
    animation: ${shake} 0.3s linear infinite both;
  }
`;


const clearAccessTokenCookie = () => {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.trendtube.online; path=/;";
};


function Navbar() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [query, setQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [hasClickedNotifications, setHasClickedNotifications] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setShowConfirmation(true);
  };

  const confirmLogout = async () => {
    clearAccessTokenCookie();
    await axios.get("/auth/logout", { withCredentials: true });
    dispatch(logout());
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('users/notifications');
      const notifications = response.data;
      setNotifications(notifications);
      const unseenNotifications = notifications.filter(notification => !notification.viewed);
      const count = unseenNotifications.length;
      setNewNotificationCount(count);
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleNotifications = async () => {
    try {
      await axios.post('users/notificationUpdate');
    } catch (err) {
      console.log(err.message);
    }

    setShowNotifications((prevState) => !prevState);
    setHasClickedNotifications(true);
    setNewNotificationCount(0);
  };

  useEffect(() => {
    if (currentUser && !hasClickedNotifications) {
      fetchNotifications();
    }
  }, [currentUser, hasClickedNotifications]);

  useEffect(() => {
    setHasClickedNotifications(false);
  }, [currentUser]);

  return (
    <>
      <Container>
        <Wrapper>
          <SearchBar>
            <SearchInputStyled
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton onClick={() => navigate(`/search?query=${query}`)}>
              <SearchTwoToneIcon style={{ color: "#a970ff" }} />
            </SearchButton>
          </SearchBar>
          {currentUser ? (
            <User>
              <DropdownWrapper>
                <NotificationsIcon onClick={toggleNotifications} />
                {newNotificationCount > 0 && <NotificationCount>{newNotificationCount}</NotificationCount>}
                <DropdownContent show={showNotifications}>
                  {notifications.map((noti) => (
                    <DropdownItem key={noti._id}>{noti.message}</DropdownItem>
                  ))}
                </DropdownContent>
              </DropdownWrapper>
              <VideoCallOutlinedIcon onClick={() => setShow1(true)} />
              <Avatar onClick={() => setShow2(true)} src={currentUser.image} />
              <UserName onClick={handleLogout}>
                {currentUser.name}
              </UserName>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none", color: 'inherit' }}>
            <StyledButton>
               <AccountCircleOutlinedIcon />
       Sign In
     </StyledButton>
            
             
            </Link>
          )}
        </Wrapper>
      </Container>

      {show1 && <Upload setShow1={setShow1} />}
      {show2 && <Profile setShow2={setShow2} />}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <ConfirmationDialog>
          <h3>Are you sure you want to logout?</h3>
          <div className="button-container">
            <Button onClick={confirmLogout}>Logout</Button>
            <Button onClick={cancelLogout}>Cancel</Button>
          </div>
        </ConfirmationDialog>
      )}
    </>
  );
}

export default Navbar;
