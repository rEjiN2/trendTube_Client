import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedUser = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('adminAccess_token');
     console.log(accessToken,"acess")
    if (!accessToken) {
      navigate('/admin/');
    }
  }, [navigate]);

  return children;
};

export default ProtectedUser;
