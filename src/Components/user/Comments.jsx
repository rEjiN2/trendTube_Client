import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Comment from './Comment';
import axios from '../../utils/axios'
import { useSelector } from 'react-redux';

const Container = styled.div`

`;
const NewComment = styled.div`
display:flex;
align-items:center;
gap:10px;
`
const Input = styled.input`
border:none;
outline:none;
background-color:transparent;
width:100%;
border-bottom:1px solid ${({theme}) => theme.soft};
padding:5px;
color:${({ theme }) => theme.text};
`
const Avatar = styled.img`

  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Button = styled.button`
  border: none;
  background-color: ${({theme}) => theme.primary};
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

function Comments({videoId}) {
  const {currentUser} = useSelector((state)=>state.user)
  const [comments,setComments] = useState([]);
  const [description , setDescription] = useState("");

  useEffect(()=>{
    const fetchComments = async ()=>{
      try{
        const res = await axios.get(`/comments/${videoId}`)
        setComments(res.data)
      }
      catch(err){

      }

    }
    fetchComments()
  },[videoId])

  const handleComment = async(e)=>{
    e.preventDefault()
    try{
       await axios.post(`/comments` ,{description ,videoId} ).then((res)=>{
        setComments([...comments, res.data])
        setDescription("");

       })
    }catch(err){
     console.log(err.message,"err");
    }
  }

  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser?.image} />
            <Input placeholder='Add a Comment ....' value={description}  onChange={(e)=>setDescription(e.target.value)} />
            <Button onClick={handleComment} >Submit</Button>
        </NewComment>
        {comments.map((comment)=>(

        <Comment key={comment._id} comment={comment}/>

        ))}
        
       
    </Container>
  )
}

export default Comments