import React, { useEffect, useState }  from 'react'
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../../Components/user/Card";
import axios from '../../utils/axios';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 90px;
`;


const Search = () => {

    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
          const res = await axios.get(`/videos/search${query}`);
          setVideos(res.data);
        };
        fetchVideos();
      }, [query]);
  return (
    <Container>
    {videos.map(video=>(
      <Card key={video._id} videos={video}/>
    ))}
  </Container>
  )
}

export default Search