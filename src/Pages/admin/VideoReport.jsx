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

function VideoReport() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideoList = async () => {
      try {
        const res = await axios.get('videos/videoList');
        setVideos(res?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getVideoList();
  }, []);

  const handleBlock = async (videoId) => {
    try {
      const res = await axios.put(`/adminVerify/block/${videoId}`);
      const updatedVideo = res.data;
      setVideos((prevVideos) => 
        prevVideos.map((video) =>
          video._id === updatedVideo._id ? updatedVideo : video
        )
      );
    } catch (err) {
      console.log(err.message);
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
            {videos.map((video, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.report}</TableCell>
                <TableCell>
                  {video.blocked ? (
                    <button className="block" onClick={() => handleBlock(video._id)}>
                      Unblock
                    </button>
                  ) : (
                    <button className="block" onClick={() => handleBlock(video._id)}>
                      Block
                    </button>
                  )}
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

export default VideoReport;
