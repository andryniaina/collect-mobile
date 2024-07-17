import axios from 'axios';
import {BACKEND_URL} from '../../config/app.config';

const login = async (user:any)=>{
    try {
        console.log(BACKEND_URL,"/auth/login");
        const response = await axios.post(`${BACKEND_URL}/auth/login`,user);
        return response;
    } catch (error) {
        console.error('Error fetching forms from server:', error);
    }
}

export{login}