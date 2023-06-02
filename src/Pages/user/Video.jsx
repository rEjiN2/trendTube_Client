import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../../Components/user/Comments";
import Recommendation from '../../Components/user/Recommendation';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from "../../utils/axios"
import { fetchSuccess, like ,disLike} from '../../redux/videoSlice';
import {format} from 'timeago.js'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscription } from '../../redux/userSlice';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import { MoreVertOutlined } from '@mui/icons-material';
const Container = styled.div`
display:flex;
gap:24px;
height:200vh;
`;
const Content = styled.div`
flex:3.5;
`;
const VideoWrapper = styled.div`

`;
const Title = styled.h1`
font-size:18px;
font-weight:400;
margin-top:20px;
margin-bottom:10px;
color: ${({ theme }) => theme.text};
`;

const Details= styled.div`
display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
`;

const Buttons =styled.div`
display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
`
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.7px solid ${({ theme }) => theme.bgLighter};
`;



const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
 margin-top:-10px;
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
max-height:480px;
width:100%;
object-fit:cover;
`

const MoreIcon = styled(MoreVertOutlined)`
  cursor: pointer;
`;
const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 10px); 
  right: 0;
  width:120px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownMenuItem = styled.li`
  cursor: pointer;
  padding: 5px 0;
`;
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border: 1px solid #ccc;
  display: ${({ open }) => (open ? 'block' : 'none')};
  font-family: 'Your Attractive Font', sans-serif;
  font-size: 18px;
  color: black;

  @media (max-width: 425px) {
    width: 80%;
    max-height: 100%;
    overflow-y: scroll;
  }
`;
const Recom = styled.div`
@media screen and (max-width: 425px) {
  
    display: none;
  
}
`

const PopupMessage = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
`;

const CloseButton = styled.button`
  background-color: #cc1a00;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
`;
const ReasonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ReasonOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input[type='radio'] {
    margin-right: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background-color: #cc1a00;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #cc1a00;
  border: 1px solid #cc1a00;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
`;

function Video() {
   const {currentUser} = useSelector((state)=>state.user)
   const {currentVideo} = useSelector((state)=> state.video)
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [selectedReason, setSelectedReason] = useState('');
   
   const handleToggleDropdown = (event) => {
     const iconPosition = event.target.getBoundingClientRect();
     setMenuPosition({
       top: iconPosition.bottom + window.pageYOffset,
       left: iconPosition.right - iconPosition.width,
     });
     setIsDropdownOpen(!isDropdownOpen);
   };
 
  
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2]

  
  const [channel , setChannel] = useState({})
  const [isReported, setIsReported] = useState(false)
  
   
   useEffect(()=>{
    const fetchData = async() =>{
      try{
        const videoRes = await axios.get(`/videos/find/${path}`)
        
        
        const channelRes = await axios.get(`/users/find/${videoRes?.data.userId}`)
        
        setChannel(channelRes.data)
        
        dispatch(fetchSuccess(videoRes.data))
      }
      catch(err){

      }
    }
    fetchData();
   },[path,dispatch])
   
    useEffect(()=>{
      const views = async()=>{
        try{
             await axios.put(`/videos/view/${currentVideo._id}`).then((res)=>{
             
              ;})
        }catch(err){
            
        }
      }
      views();
    },[currentVideo?._id])


   const handleLike = async()=>{
     if (currentUser) {
      const userName = currentUser.name;
      axios.put(`/users/like/${currentVideo._id}`, { userName });
      dispatch(like(currentUser._id));
    } else {
      setIsPopupOpen(true);
    }
   }
   const handleDisLike = async()=>{
    if(currentUser){

      await axios.put(`/users/disLike/${currentVideo._id}`)
      dispatch(disLike(currentUser._id))
    }
    else{
      setIsPopupOpen(true);
    }

   }
   const handleSubscribe = async () =>{
    if(currentUser){
      currentUser.subscribedUsers.includes(channel._id) ? await axios.put(`/users/unsub/${channel._id}`) :
      await axios.put(`/users/sub/${channel._id}`);
      dispatch(subscription(channel._id))
    }else{
      setIsPopupOpen(true);
    }
   }
   const handleReport = async () => {
    if(currentUser){
      const res = await axios.put(`/users/report/${channel._id}`) 
    }else{
      setIsPopupOpen(true);
    }
      
    
  }
//  const handleVideoReport = async () => {
//   if(currentUser){

//     try{

//       const res = await axios.put(`/videos/reportVid/${currentVideo._id}`)
//       res.status===200 && setIsReported(true) 
//        }catch(err){
//         console.log(err.message);
//       }
//     }
//     else{
//       setIsPopupOpen(true);
//     }  
      
//  }
const handleVideoReport = () => {
  if (currentUser) {
    setShowPopup(true);
  } else {
    setIsPopupOpen(true);
  }
};
const handleReportSubmit = async () => {
  if (selectedReason !== '') {
    try {
      const res = await axios.put(`/videos/reportVid/${currentVideo._id}`, {
        reason: selectedReason
      });
      if (res.status === 200) {
        setIsReported(true);
        setShowPopup(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
};


  return (
    <Container>
        <Content>
       <VideoWrapper>
        <VideoFrame src ={currentVideo?.videoUrl}  controls/>
       </VideoWrapper>
       <Title>{currentVideo?.title}</Title>
       <Details>
        <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
        <Buttons>
        <Button onClick={handleLike}>
          {currentVideo?.likes?.includes(currentUser?._id) ? (<ThumbUpIcon/>): (<ThumbUpOutlinedIcon /> ) }
          {currentVideo?.likes?.length}
          </Button>
        <Button onClick={handleDisLike}>
          {currentVideo?.disLikes?.includes(currentUser?._id) ? (<ThumbDownIcon/>):(<ThumbDownOffAltOutlinedIcon />) }{currentVideo?.disLikes?.length}</Button>
        <Button><ReplyOutlinedIcon /> Share</Button>
          <Button><AddTaskOutlinedIcon /> Save</Button>
        {isReported===true ? <Button>Reported</Button> : <Button onClick={handleVideoReport} > <TourOutlinedIcon/>Report </Button>}  
        </Buttons>
        <Popup open={showPopup}>
  <PopupMessage>Please select a reason:</PopupMessage>
  <ReasonsContainer>
    <ReasonOption>
      <input
        type="radio"
        id="reason1"
        value="Reason 1"
        checked={selectedReason === 'Reason 1'}
        onChange={() => setSelectedReason('Reason 1')}
      />
      <label htmlFor="reason1">Inappropriate Content</label>
    </ReasonOption>
    <ReasonOption>
      <input
        type="radio"
        id="reason2"
        value="Reason 2"
        checked={selectedReason === 'Reason 2'}
        onChange={() => setSelectedReason('Reason 2')}
      />
      <label htmlFor="reason2">Promote terrorisom</label>
    </ReasonOption>
    <ReasonOption>
      <input
        type="radio"
        id="reason3"
        value="Reason 3"
        checked={selectedReason === 'Reason 3'}
        onChange={() => setSelectedReason('Reason 3')}
      />
      <label htmlFor="reason3">Adult Content</label>
    </ReasonOption>
  </ReasonsContainer>
  <ButtonContainer>
    <SubmitButton onClick={handleReportSubmit}>Submit</SubmitButton>
    <CancelButton onClick={() => setShowPopup(false)}>Close</CancelButton>
  </ButtonContainer>
</Popup>


       </Details>
       <Hr/>
       <Channel>
          <ChannelInfo>
            <Image src={channel?.image} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
              {currentVideo?.description}
              </Description>
            </ChannelDetail>
            <MoreIcon onClick={handleToggleDropdown} />
        <DropdownMenu isOpen={isDropdownOpen} style={{ top: menuPosition.top, left: menuPosition.left }}>
          <DropdownMenuItem onClick={handleReport}>Report User</DropdownMenuItem>
        </DropdownMenu>
      </ChannelInfo>
      <Subscribe onClick={handleSubscribe}>
        {currentUser?.subscribedUsers?.includes(channel?._id)
          ? 'SUBSCRIBED'
          : 'SUBSCRIBE'}
      </Subscribe>
         
        </Channel>
        <Hr />
        <Comments videoId = {currentVideo?._id}/>
        </Content>
        <Recom>
        <Recommendation tags={currentVideo?.tags}/>
        </Recom>
        <Popup open={isPopupOpen}>
        <PopupMessage>Please sign in to perform this action.</PopupMessage>
        <CloseButton onClick={() => setIsPopupOpen(false)}>Close</CloseButton>
      </Popup>
    </Container>
  )
}  

export default Video