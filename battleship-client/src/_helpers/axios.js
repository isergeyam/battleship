import axios from 'axios';
import config from 'config';
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://3.136.160.86:9090/api';

export default axios.create({
  baseURL: REACT_APP_API_BASE_URL
});