import axios from 'axios';
import { HOST } from '../variables'

export const getTraffic = () => axios.get(`${HOST}/api/traffic`)
