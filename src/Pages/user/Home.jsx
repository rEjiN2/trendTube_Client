import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../../Components/user/Card'
import axios from '../../utils/axios'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap:7.50px;
`;



function Home({type}) {

const [video,setVideos] = useState([])

useEffect(()=>{

  const fetchVideos = async()=>{
    try{
      const res = await axios.get(`/videos/${type}`,{withCredentials: true, credentials: 'include'})
      setVideos(res.data)
    }
    catch(err){
        console.log(err);
    } 
  }
    fetchVideos()
},[type])

 
  return (
    <Container>

      {video.map(video => (
     <Card key={video._id} videos={video} />
      ))}
     
    
    </Container>
  )
}

export default Home