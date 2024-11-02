import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';

const getUser = async (userId) => {
    const response = await axios.get(`${baseURL}/get-user/${userId}`);
    return response.data; 
};

export { getUser };
