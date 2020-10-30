import axios from 'axios';

const api = axios.create({
    baseURL: 'https://library-manager-api.herokuapp.com/api/'
});

export default api;
