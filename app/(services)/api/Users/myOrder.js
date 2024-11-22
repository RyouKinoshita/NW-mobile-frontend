import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';

const myOrder = async (userId) => {
    const response = await axios.get(`${baseURL}/order/my-order/${userId}`);
    return response.data; 
};

export { myOrder };

