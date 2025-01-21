import axios from 'axios';
import baseURL from '../../../../../assets/common/baseURL'

const getAllUsers = async () => {
    const response = await axios.get(`${baseURL}/get-all-users`);
    return response.data;
};


export { getAllUsers};