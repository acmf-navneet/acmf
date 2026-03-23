import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/credentials/login`, {
        username: userName,
        password: password,
      });
  
    
      if (response.status === 200 && response.data === 'Login successful') {
       setMessage('You are logged in.');
        setMessageType('success');
      } else {
        setMessage('Incorrect username or password.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Incorrect username or password.');
      setMessageType('error');
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Create Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {message && (
              <Box
                sx={{
                  backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
                  color: messageType === 'success' ? '#155724' : '#721c24',
                  borderRadius: '4px',
                  padding: '10px',
                  width: '100%',
                  marginBottom: '15px',
                  border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {message}
                </Typography>
              </Box>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderRadius: '12px',
                  },
                },
              }}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="confirmpassword"
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderRadius: '12px',
                  },
                },
              }}
            />
            <Button
              href="/dashboard"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderRadius: '12px',
                  },
                },
                mt: 3,
                mb: 2,
                bgcolor: '#004C7B',
                color: 'white',
                '&:hover': {
                  bgcolor: '#003a6e',
                },
              }}
            >
              Create Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
