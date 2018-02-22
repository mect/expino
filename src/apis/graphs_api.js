import axios from 'axios';
import { HOST } from '../variables'

export const getAllGraphs = () => axios.get(`${HOST}/api/graphs`);
