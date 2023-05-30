import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedAdmin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('adminAccess_token');

    if (accessToken) {
      navigate('/admin/adminHome');
    }
  }, [navigate]);

  return children;
};

export default ProtectedAdmin;
