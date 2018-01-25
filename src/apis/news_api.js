import axios from 'axios';

const HOST = "http://localhost:8080";

export const getAllNews = () => axios.get(`${HOST}/api/news`);
