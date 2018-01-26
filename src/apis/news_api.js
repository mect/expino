import axios from 'axios';
import { HOST } from '../variables'

export const getAllNews = () => axios.get(`${HOST}/api/news`);
