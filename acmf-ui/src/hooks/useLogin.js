import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/api';

const useLogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.status === 200) {
        navigate('/dashboard');
      } else if (response.status === 404) {
        setError('Incorrect email or password.');
      } else {
        setError('Unexpected error occurred.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  return { login, error };
};

export default useLogin;
