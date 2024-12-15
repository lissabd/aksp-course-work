

import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('/test/results/1', (req) => {
    return HttpResponse.json({
      testTitle: "Основы JavaScript",
      score: 100,
      completedAt: '2024-12-15',
      correctAnswers: 5,
      totalQuestions: 5,
      questions: [
        {
          id: 1,
          question_text: 'Что такое замыкание в JavaScript?',
          correct_answer: 'Функция, которая может "запомнить" переменные из внешней функции',
          selected_answer: 'Функция, которая может "запомнить" переменные из внешней функции',
        },
        {
          id: 2,
          question_text: 'Что такое асинхронный код в JavaScript?',
          correct_answer: 'Код, который выполняется параллельно с другими операциями',
          selected_answer: 'Код, который выполняется параллельно с другими операциями',
        },
        {
          id: 3,
          question_text: 'Что такое промисы в JavaScript?',
          correct_answer: 'Механизм обработки асинхронных операций',
          selected_answer: 'Механизм обработки асинхронных операций',
        },
        {
          id: 4,
          question_text: 'Что такое каррирование в JavaScript?',
          correct_answer: 'Техника, при которой функция с несколькими аргументами преобразуется в последовательность функций с одним аргументом',
          selected_answer: 'Техника, при которой функция с несколькими аргументами преобразуется в последовательность функций с одним аргументом',
        },
        {
          id: 5,
          question_text: 'Что такое стрелочные функции в JavaScript?',
          correct_answer: 'Синтаксический сахар для написания анонимных функций',
          selected_answer: 'Синтаксический сахар для написания анонимных функций',
        },
      ]
    });
  }),

  http.post('/login', () => {
    return HttpResponse.json({ token: 'mock-jwt-token' });
  }),

  http.post('/register', () => {
    return HttpResponse.json({ message: 'Пользователь успешно зарегистрирован' }, { status: 201 });
  }),

  http.get('/tests', () => {
    console.log('Handling /tests request');
    return HttpResponse.json([
      { id: 1, title: 'Основы JavaScript', category: 'Программирование' },
      { id: 2, title: 'Алгоритмы и структуры данных', category: 'Программирование' },
      { id: 3, title: 'ООП в Python', category: 'Программирование' },
      { id: 4, title: 'Функциональное программирование в JavaScript', category: 'Программирование' },
      { id: 5, title: 'Основы работы с базами данных', category: 'Программирование' },
      { id: 6, title: 'Продвинутые алгоритмы сортировки', category: 'Программирование' },
      { id: 7, title: 'Машинное обучение с Python', category: 'Программирование' },
    ]);
  }),

  http.get('/test/1', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Что такое замыкание в JavaScript?',
          answers: [
            { id: 1, answer_text: 'Функция, которая может "запомнить" переменные из внешней функции' },
            { id: 2, answer_text: 'Тип данных в языке программирования' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое асинхронный код в JavaScript?',
          answers: [
            { id: 1, answer_text: 'Код, который выполняется синхронно с основным потоком' },
            { id: 2, answer_text: 'Код, который выполняется параллельно с другими операциями' },
          ],
        },
        {
          id: 3,
          question_text: 'Что такое промисы в JavaScript?',
          answers: [
            { id: 1, answer_text: 'Механизм обработки асинхронных операций' },
            { id: 2, answer_text: 'Техника синхронизации многозадачности' },
          ],
        },
        {
          id: 4,
          question_text: 'Что такое каррирование в JavaScript?',
          answers: [
            { id: 1, answer_text: 'Техника, при которой функция с несколькими аргументами преобразуется в последовательность функций с одним аргументом' },
            { id: 2, answer_text: 'Техника многозадачности в JavaScript' },
          ],
        },
        {
          id: 5,
          question_text: 'Что такое стрелочные функции в JavaScript?',
          answers: [
            { id: 1, answer_text: 'Синтаксический сахар для написания анонимных функций' },
            { id: 2, answer_text: 'Упрощенная версия классических функций' },
          ],
        },
      ],
    });
  }),

  http.get('/test/2', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Что такое структура данных "связанный список"?',
          answers: [
            { id: 1, answer_text: 'Структура данных, состоящая из узлов, каждый из которых содержит данные и указатель на следующий узел' },
            { id: 2, answer_text: 'Массив, в котором элементы хранятся в случайном порядке' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое алгоритм "быстрой сортировки"?',
          answers: [
            { id: 1, answer_text: 'Алгоритм, который сортирует данные, деля их пополам' },
            { id: 2, answer_text: 'Алгоритм, который использует принцип "разделяй и властвуй" для эффективной сортировки' },
          ],
        },
      ],
    });
  }),

  http.get('/test/3', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Что такое инкапсуляция в ООП?',
          answers: [
            { id: 1, answer_text: 'Принцип скрытия данных и методов внутри объекта' },
            { id: 2, answer_text: 'Принцип разделения программы на несколько независимых частей' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое полиморфизм в ООП?',
          answers: [
            { id: 1, answer_text: 'Принцип использования одного интерфейса для различных типов объектов' },
            { id: 2, answer_text: 'Принцип объединения данных и методов в одну сущность' },
          ],
        },
      ],
    });
  }),

  http.get('/test/4', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Что такое чистая функция в функциональном программировании?',
          answers: [
            { id: 1, answer_text: 'Функция, которая не изменяет внешние состояния и всегда возвращает одно и то же значение для одинаковых аргументов' },
            { id: 2, answer_text: 'Функция, которая изменяет состояния внешних переменных' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое каррирование?',
          answers: [
            { id: 1, answer_text: 'Техника, при которой функция с несколькими аргументами может быть преобразована в серию функций с одним аргументом' },
            { id: 2, answer_text: 'Алгоритм, при котором выполняется несколько операций одновременно' },
          ],
        },
      ],
    });
  }),

  http.get('/test/5', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Что такое нормализация базы данных?',
          answers: [
            { id: 1, answer_text: 'Процесс организации данных в базе таким образом, чтобы минимизировать избыточность' },
            { id: 2, answer_text: 'Процесс сохранения всех данных в одной таблице' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое SQL-инъекция?',
          answers: [
            { id: 1, answer_text: 'Вредоносная операция, при которой пользователь может изменить SQL-запрос' },
            { id: 2, answer_text: 'Процесс создания индексов для ускорения запросов' },
          ],
        },
      ],
    });
  }),

  http.get('/test/6', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Какой алгоритм сортировки является наиболее эффективным для больших наборов данных?',
          answers: [
            { id: 1, answer_text: 'Алгоритм быстрой сортировки (Quicksort)' },
            { id: 2, answer_text: 'Алгоритм пузырьковой сортировки' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое асимптоти́ческая сложность алгоритма?',
          answers: [
            { id: 1, answer_text: 'Мера производительности алгоритма в зависимости от размера входных данных' },
            { id: 2, answer_text: 'Количественная характеристика быстродействия программы' },
          ],
        },
      ],
    });
  }),

  http.get('/test/7', (req) => {
    const { id } = req.params;
    return HttpResponse.json({
      testId: id,
      questions: [
        {
          id: 1,
          question_text: 'Что такое машинное обучение?',
          answers: [
            { id: 1, answer_text: 'Подход, при котором компьютер обучается на данных, улучшая свою работу с опытом' },
            { id: 2, answer_text: 'Процесс программирования с использованием искусственного интеллекта' },
          ],
        },
        {
          id: 2,
          question_text: 'Что такое нейронные сети?',
          answers: [
            { id: 1, answer_text: 'Математическая модель, имитирующая работу человеческого мозга' },
            { id: 2, answer_text: 'Тип базы данных, использующий связи между объектами' },
          ],
        },
      ],
    });
  }),

  http.post('/test/1/submit', () => {
    return HttpResponse.json({
      message: `Ответы на тест успешно отправлены`,
      score: 85,
    });
  }),

  http.get('/users', () => {
    return HttpResponse.json([
      { id: 1, username: 'JohnDoe', email: 'john@example.com', role: 'user' },
      { id: 2, username: 'JaneDoe', email: 'jane@example.com',  role: 'user' },
    ]);
  }),

  http.get('/user/:userId', (req) => {
    const { userId } = req.params;
    return HttpResponse.json({
      id: userId,
      username: userId === '1' ? 'JohnDoe' : 'JaneDoe',
      email: userId === '1' ? 'john@example.com' : 'jane@example.com',
      fullName: userId === '1' ? 'John Doe' : 'Jane Doe',
    });
  }),

  http.get('/user/:userId/history', (req) => {
    const { userId } = req.params;
    return HttpResponse.json([
      { testId: 1, score: 80, completed_at: '2024-12-01' },
      { testId: 2, score: 95, completed_at: '2024-12-10' },
    ]);
  }),

  http.post('/admin/block/:userId', (req) => {
    const { userId } = req.params;
    return HttpResponse.json({ message: `Пользователь ${userId} заблокирован` });
  }),
  
  http.delete('/test/:testId', (req) => {
    const { testId } = req.params;
    return HttpResponse.json({ message: `Тест с ID ${testId} успешно удален` });
  }),
];
