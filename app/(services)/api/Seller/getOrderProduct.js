import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';

const getOrderProduct = async (productId) => {
    const response = await axios.get(`${baseURL}/product/get-order-product/${productId}`);
    return response.data; 
};

export { getOrderProduct };