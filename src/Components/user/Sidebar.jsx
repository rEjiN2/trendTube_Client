import React from 'react';
import styled from 'styled-components';
import trendTube from '../../img/lo1.png';
import smallTube from '../../img/timg.jpg'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter}};
  color: ${({ theme }) => theme.text};
  height: 125vh;
  position: sticky;
  top: 0;
  @media screen and (max-width: 768px) {
    position: static;
    height: auto;
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  padding: 10px;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
  width: 100px;
  @media screen and (max-width: 425px) {
    width: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  @media screen and (max-width: 425px) {
    span {
      display: none;
    }
  }
`;

const Hr = styled.div`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  @media screen and (max-width: 320px) {
    border:none;
  }
`;

const Br = styled.div`
  margin: 8px 0px;
`;

const Login = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

function Sidebar({ darkMode, setDarkMode }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Img src={smallTube} />
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          <span>Home</span>
        </Item>
        <Br />
        <Link to="trends" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Item>
            <ExploreOutlinedIcon />
            <span>Explore</span>
          </Item>
        </Link>
        <Br />
        <Link
          to="subscriptions"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            <span>Subscriptions</span>
          </Item>
        </Link>
        <Hr />
        <Link to="myvideos" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Item>
            <VideoLibraryOutlinedIcon />
            <span>My Videos</span>
          </Item>
        </Link>
        <Br />
        <Link to="history" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Item>
            <HistoryOutlinedIcon />
            <span>History</span>
          </Item>
        </Link>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              <Link to="signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  Sign In
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF TRENDTUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          <span>Music</span>
        </Item>
        <Br />
        <Item>
          <SportsBasketballOutlinedIcon />
          <span>Sports</span>
        </Item>
        <Br />
        <Item>
          <SportsEsportsOutlinedIcon />
          <span>Gaming</span>
        </Item>
        <Br />
        <Item>
          <MovieOutlinedIcon />
          <span>Movies</span>
        </Item>
        <Br />
        <Item>
          <ArticleOutlinedIcon />
          <span>News</span>
        </Item>
        <Br />
        <Item>
          <LiveTvOutlinedIcon />
          <span>Live</span>
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          <span>Settings</span>
        </Item>
        <Br />
        <Item>
          <FlagOutlinedIcon />
          <span>Report</span>
        </Item>
        <Br />
        <Item>
          <HelpOutlineOutlinedIcon />
          <span>Help</span>
        </Item>
        <Br />
        <Item onClick={() => { setDarkMode(!darkMode) }}>
          <SettingsBrightnessOutlinedIcon />
          <span>Light Mode</span>
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Sidebar;
