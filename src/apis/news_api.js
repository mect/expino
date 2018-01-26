import axios from 'axios';

const HOST = "http://192.168.99.100:8080";

export const getAllNews = () => axios.get(`${HOST}/api/news`);
