
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1617360547704-3da8b5363369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
  background-size: cover;
  background-position: center;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 24px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  width: 300px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

function AdminLogin() {

const [email,setEmail]  = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async(e)=>{
    e.preventDefault();
 try{
  const res =    await axios.post(`/adminAuth/adminSignIn`,{ email, password }, { withCredentials: true ,credentials:'include' })
  const { token, ...remainingData } = res?.data;
  console.log(res,"hi");
Cookies.set('adminAccess_token', token, { 
  expires: 365,   
});
  navigate("/admin/adminHome");
 }catch(err){
console.log(err.message);
 } 
}

  return (
    <Container>
      <Title>Admin</Title>
      <Input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <Button onClick={handleLogin} >Login</Button>
    </Container>
  );
}

export default AdminLogin;
