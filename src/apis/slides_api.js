import axios from 'axios';
import { HOST } from '../variables'

export const getAllSlides = () => axios.get(`${HOST}/api/settings/featureslides`);
