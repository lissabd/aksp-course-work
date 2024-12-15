/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/users');
        setUsers(usersResponse.data);

        const testsResponse = await axios.get('/tests');
        setTests(testsResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных', error);
      }
    };

    fetchData();
  }, []);

  const handleBlockUser = async (userId: number) => {
    try {
      await axios.post(`/admin/block/${userId}`);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Ошибка при блокировке пользователя', error);
    }
  };

  const handleCreateTestClick = () => {
    navigate('/create-test');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Панель администратора</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Управление пользователями:
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleBlockUser(user.id)}
                  >
                    Заблокировать
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Нет пользователей</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Управление тестами:
      </Typography>
      <Button variant="contained" sx={{ marginBottom: 2 }}  onClick={handleCreateTestClick}>
        Создать тест
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Категория</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {tests && tests.length > 0 ? (
            tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.title}</TableCell>
                <TableCell>{test.category}</TableCell>
               
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Нет тестов</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminDashboard;
