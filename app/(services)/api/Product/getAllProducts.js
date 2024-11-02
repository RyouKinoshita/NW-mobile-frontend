import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL'

const getAllProduct = async () => {
    const response = await axios.get(`${baseURL}/product/get-all-products`);
    // console.log(response.data) 
    return response.data;
};


export { getAllProduct};