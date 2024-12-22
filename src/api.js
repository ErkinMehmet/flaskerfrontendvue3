// src/api.js
import axios from 'axios';

export const fetchData = () => {
  return axios.get('http://your-flask-backend.com/api/data');
};
