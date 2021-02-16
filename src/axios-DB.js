import axios from 'axios';
import { DBHost } from './shared/consts';

const instance = axios.create({
    baseURL: DBHost
});

export default instance;  