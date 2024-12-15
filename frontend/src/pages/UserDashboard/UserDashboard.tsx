
import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [testHistory, setTestHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/1');
        setUserInfo(response.data);

        const historyResponse = await axios.get(`/user/1/history`);
        const historyData = historyResponse.data;

        const detailedHistory = await Promise.all(
          historyData.map(async (test: any) => {
            const resultResponse = await axios.get(`/test/results/${test.testId}`);
            return {
              ...test,
              testTitle: resultResponse.data.testTitle,
              score: resultResponse.data.score,
              completedAt: resultResponse.data.completedAt,
            };
          })
        );

        setTestHistory(detailedHistory);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h4">Личный кабинет</Typography>
        {userInfo && (
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant="h6">Информация о пользователе</Typography>
            <Typography>Email: {userInfo.email}</Typography>
            <Typography>Имя: {userInfo.username} {userInfo.personalInfo?.lastName}</Typography>
          </Box>
        )}
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h6">История тестов</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название теста</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Результат</TableCell>
                  <TableCell>Дата прохождения</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow >
                    <TableCell>Основы JavaScript</TableCell>
                    <TableCell>Программирование</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>2024-12-15</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDashboard;

