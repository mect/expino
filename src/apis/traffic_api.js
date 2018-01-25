import axios from 'axios';

const HOST = "http://localhost:8080"

export const getTraffic = () => axios.get(`${HOST}/api/traffic`)
