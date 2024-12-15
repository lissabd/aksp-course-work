import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', { email, password });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage('Ошибка регистрации');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2rem' }}>
        <Typography variant="h5">Регистрация</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginBottom: '1rem' }}>
            Зарегистрироваться
          </Button>
          {message && <Typography color="error">{message}</Typography>}
        </form>
        <Typography variant="body2">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
