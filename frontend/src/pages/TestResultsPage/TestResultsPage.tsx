
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';

const TestResults = () => {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/test/results/1');
        setResults(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке результатов', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#241f3a', minHeight: '100vh' }}>
      {results ? (
        <Box sx={{ maxWidth: '900px', margin: '0 auto', borderRadius: 3, padding: 4, boxShadow: 4 , backgroundColor: '#a9a2b6'}}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
            Результаты теста: {results.testTitle}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Правильных ответов:</strong> {results.correctAnswers} из {results.totalQuestions}
          </Typography>
          <Typography variant="body1" sx={{  marginBottom: 4 }}>
            <strong>Баллы:</strong> {results.score}
          </Typography>

          <Paper sx={{  padding: 3, borderRadius: 2 }}>
            <Table sx={{ minWidth: 650, color: 'black' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Вопрос</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Правильный ответ</TableCell>
                  <TableCell sx={{  fontWeight: 'bold' }}>Ваш ответ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(results.questions) && results.questions.map((question: any) => (
                  <TableRow key={question.id}>
                    <TableCell >{question.question_text}</TableCell>
                    <TableCell >{question.correct_answer}</TableCell>
                    <TableCell >{question.selected_answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: '#ffffff' }}>Загрузка результатов...</Typography>
      )}
    </Box>
  );
};

export default TestResults;
