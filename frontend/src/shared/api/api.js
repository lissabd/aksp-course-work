import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  login: '/login',
  register: '/register',
  tests: '/tests',
  testDetails: (id) => `/test/${id}`,
  submitTest: (id) => `/test/${id}/submit`,
  testResults: (userId) => `/test/results/${userId}`,
  users: '/users',
  blockUser: (id) => `/admin/block/${id}`,
  userHistory: (id) => `/user/${id}/history`,
  userDetails: (id) => `/user/${id}`,
};
