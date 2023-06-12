import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/user/Loader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200vh;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  max-width: 400px;
  width: 100%;
  height:100%;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setIsLoading(true);
    try {
      const res = await axios.post(
        '/auth/signIn',
        { email, password },
        { withCredentials: true, credentials: 'include' }
      );
      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure());
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post('/auth/googleAuth', {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate('/');
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
        setLoginError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setIsLoading(true);
      try { 
        await axios
          .post('/auth/signUp', { name, password, email }, { withCredentials: true, credentials: 'include' })
          .then((res) => {
            dispatch(loginSuccess(res?.data));
            navigate('/');
          });
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrMsg('Password Not Match');
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          <Title>Sign in</Title>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          {loginError && <p style={{ color: 'red' }}>Login failed. Please try again.</p>}
          <Button onClick={handleLogin}>Sign in</Button>
          <Title>or</Title>
          <Button onClick={signInWithGoogle}>Sign In With Google</Button>
          <Title>or</Title>
          <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="confirm.password" onChange={(e) => setConfirmPassword(e.target.value)} />
          {errMsg !== '' ? <p style={{ color: 'red' }}>{errMsg}</p> : ''}
          <Button onClick={handleSignup}>Sign up</Button>
        </Wrapper>
      )}

      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default Login;
