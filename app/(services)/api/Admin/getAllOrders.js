import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL'

const getAllOrders = async () => {
    const response = await axios.get(`${baseURL}/order/get-all-orders`);
    return response.data;
};


export { getAllOrders };