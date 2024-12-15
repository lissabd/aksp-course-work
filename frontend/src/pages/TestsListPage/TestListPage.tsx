
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const TestsList = () => {
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/tests')
      .then((response) => setTests(response.data));
  }, []);

  return (
    <Container >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
        Выбор теста
      </Typography>
      <Grid container spacing={4}>
        {tests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              }
            }}>
              <CardContent sx={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>
                  {test.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '20px' }}>
                  {test.category}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderRadius: '30px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                  href={`/test/${test.id}`}
                >
                  Начать тест
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TestsList;
