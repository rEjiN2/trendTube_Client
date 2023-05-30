import React from 'react'
import styled from 'styled-components'
import trendTube from '../../img/lo1.png'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
// import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
flex:1;
background-color:${({theme}) => theme.bgLighter}};
color:${({theme})=>theme.text};
height:100vh;
position:sticky;
overflow-y: auto;
top:0;
scrollbar-width: none; 
&::-webkit-scrollbar {
  display: none; 
}
@media screen and (max-width: 768px) {
  position: static; 
  height: auto; 
}
`
const Wrapper = styled.div`
padding:18px 26px;

`
const Logo = styled.div`
padding:10px;

align-items:center;
gap:5px;
font-weight:bold;
margin-bottom:25px;



`
const Img = styled.img`
height:25px;
width:100px;
`;

const Item = styled.div`
display:flex;
align-items:center;
gap:20px;
cursor:pointer;
&:hover {
  background-color: ${({ theme }) => theme.soft};
}

`
const Hr = styled.div`
margin:15px 0px;
border:0.5px solid ${({theme})=>theme.soft};

`
const Br = styled.div`
margin:7.5px 0px;
`
const Login = styled.div`

`
const Button = styled.button`
padding:5px 15px;
background-color: transparent;
border:1px solid #3ea6ff;
color:#3ea6ff;
border-radius:3px;
font-weight:500;
margin-top:10px;
cursor:pointer;
display:flex;
align-items:center;
gap:5px;



`
const Title = styled.h2`
font-size:14px;
font-weight:500;
color:#aaaaaa;
margin-bottom:20px;

`

function Sidebar({darkMode,setDarkMode}) {

  const {currentUser} = useSelector(state=>state.user)
  return (
    <Container>
       <Wrapper>
       <Link to ="/" style={{textDecoration:"none" , color:'inherit'}} >
         <Logo>
            <Img src={trendTube}/>
           
         </Logo>
       </Link>
         <Item>
            <HomeIcon/>
            Home
         </Item>
         <Br/>
         <Link to="trends" style={{textDecoration:"none" , color:'inherit'}} >
         <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        </Link>
        <Br/>
        <Link to="subscriptions" style={{textDecoration:"none" , color:'inherit'}} >
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link>
        <Hr/>
        <Link to="myvideos" style={{textDecoration:"none" , color:'inherit'}}>
        <Item >
          <VideoLibraryOutlinedIcon />
          My Videos
        </Item>
        </Link>
         <Br/>
         <Link to="history" style={{textDecoration:"none" , color:'inherit'}}>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
         </Link>
        <Hr/>
        { !currentUser && 
          <><Login>
          <Link to="signin" style={{textDecoration:"none" , color:'inherit'}} >
            <Button>
              <AccountCircleOutlinedIcon/>
               Sign In 
            </Button>
          </Link>
        </Login>
        <Hr/></>}
        <Title>BEST OF TRENDTUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Br/>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Br/>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Br/>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Br/>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
         <Br/>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr/>
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Br/>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Br/>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Br/>
        <Item onClick={()=>{setDarkMode(!darkMode)}}>
          <SettingsBrightnessOutlinedIcon />
          Light Mode
        </Item>
       </Wrapper>
    </Container>
  )
}

export default Sidebar