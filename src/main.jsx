import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL || 'http://localhost:8000/api';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
