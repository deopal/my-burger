import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-43ab3-default-rtdb.firebaseio.com'
});

export default instance;