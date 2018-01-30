import axios from 'axios';
import { HOST } from '../variables'

export const getKeukendienst = () => axios.get(`${HOST}/api/keukendienst`);
