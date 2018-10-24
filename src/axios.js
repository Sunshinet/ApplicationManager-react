import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-ab29b.firebaseio.com/',
});

export default instance;