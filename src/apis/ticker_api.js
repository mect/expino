import axios from "axios";
import { HOST } from "../variables";

export const getItems = () => axios.get(`${HOST}/api/ticker`);
