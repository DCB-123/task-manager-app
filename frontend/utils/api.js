import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust the port if different
  withCredentials: true, // important if you're using cookies for auth
});

export default api;
