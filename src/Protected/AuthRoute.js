import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  return children;
};

export default AuthRoute;
