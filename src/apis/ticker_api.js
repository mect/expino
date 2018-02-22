import axios from 'axios';
import { TICKCER_HOST, HOST } from '../variables'

export const getItems = () => axios.get(`${HOST}/api/ticker`);
export const getDiff = (setup, metric, interval, back) => axios.get(`${TICKCER_HOST}/diff/${setup}/${metric}/${interval}/${back}`);
