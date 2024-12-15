/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TestPage = () => {
  const { id } = useParams();
  const [test, setTest] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`/test/${id}`);
        setTest(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке теста', error);
      }
    };

    fetchTest();
  }, [id]);

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/test/${id}/submit`, { answers });
      window.location.href = `/test/results/1`;
    } catch (error) {
      console.error('Ошибка при отправке ответов', error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#241f3a', minHeight: '100vh' }}>
      {test && (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: 2, padding: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#6a4c9c', marginBottom: 4 }}>
            {test.title}
          </Typography>
          {test.questions.map((question: any) => (
            <Paper key={question.id} sx={{ padding: 3, marginBottom: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
              <Typography variant="h6" sx={{ marginBottom: 2, color: '#333' }}>
                {question.question_text}
              </Typography>
              <RadioGroup
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, Number(e.target.value))}
              >
                {question.answers.map((answer: any) => (
                  <FormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={<Radio sx={{ color: '#ff7043', '&.Mui-checked': { color: '#ff7043' } }} />}
                    label={answer.answer_text}
                  />
                ))}
              </RadioGroup>
            </Paper>
          ))}
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#6a4c9c', 
                padding: '12px 30px',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#4e3574', 
                },
              }}
            >
              Отправить ответы
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TestPage;
