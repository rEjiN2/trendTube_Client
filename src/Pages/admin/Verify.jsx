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

const VideoFrame = styled.iframe`
  width: 240px;
  height: 180px;
`;

function Verify() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await axios.get('/videos/getVid');
        setVideos(videos.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchVideos();
  }, []);

  const  handleVerify = async(videoId)=>{
         console.log("hi");
         try{
          await axios.put(`/adminVerify/verifyVideo/${videoId}`).then(()=>{
            setVideos(videos.filter((video)=>video._id !== videoId))
          })
         }catch(err){
          console.log(err.message);
         }
         
  }

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
              <TableHeader>Video</TableHeader>
              <TableHeader>Verify</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>
                  <VideoFrame src={video.videoUrl} frameborder="0" allowfullscreen></VideoFrame>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleVerify(video._id)} className="block">Verify</button>
                  <button className="unblock">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default Verify;
