import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CreateTestPage = () => {
  const navigate = useNavigate(); 
  const [testData, setTestData] = useState({
    title: '',
    category: '',
    questions: [{ question: '', answers: ['', ''] }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => { 
    const { name, value } = e.target;
    setTestData((prevData) => {
      const newQuestions = [...prevData.questions];
      if (name === 'question') {
        newQuestions[index].question = value;
      } else {
        newQuestions[index].answers[Number(name)] = value;
      }
      return { ...prevData, questions: newQuestions };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/tests', testData);
      navigate(`/tests/1`); 
    } catch (error) {
      setError('Не удалось создать тест. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setTestData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, { question: '', answers: ['', ''] }],
    }));
  };

  return (
    <Stack spacing={2} direction="column" alignItems="center" padding={'40px'} width={'100%'}>
      <Typography variant="h4">Создание нового теста</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Название теста"
          fullWidth
          value={testData.title}
          onChange={(e) => setTestData({ ...testData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Категория"
          fullWidth
          value={testData.category}
          onChange={(e) => setTestData({ ...testData, category: e.target.value })}
          margin="normal"
        />
        {testData.questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <TextField
              label={`Вопрос ${index + 1}`}
              fullWidth
              value={question.question}
              onChange={(e) => handleChange(e, index)}
              name="question"
              margin="normal"
            />
            {question.answers.map((answer, answerIndex) => (
              <TextField
                key={answerIndex}
                label={`Ответ ${answerIndex + 1}`}
                fullWidth
                value={answer}
                onChange={(e) => handleChange(e, index)}
                name={String(answerIndex)}
                margin="normal"
              />
            ))}
          </div>
        ))}
        <Button variant="contained" onClick={addQuestion} sx={{marginRight: 2}}>
          Добавить вопрос
        </Button>
        <Button type="submit" variant="contained" color="primary"  disabled={loading}>
          {loading ? 'Создаю...' : 'Создать тест'}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Stack>
  );
};

export default CreateTestPage;
