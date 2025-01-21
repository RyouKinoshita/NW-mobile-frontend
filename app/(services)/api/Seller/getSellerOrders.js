import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';

const getSellerOrders = async (sellerId) => {
    const response = await axios.get( `${baseURL}/order/my-order/seller/${sellerId}`);
    return response.data; 
};

export { getSellerOrders };