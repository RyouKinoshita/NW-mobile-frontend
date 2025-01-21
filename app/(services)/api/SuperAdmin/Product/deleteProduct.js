
import axios from 'axios';
import baseURL from '../../../../../assets/common/baseURL';

const deleteProduct = async (_id) => {
    try {
        const response = await axios.delete(`${baseURL}/product/delete-product/${_id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        throw error;
    }
};

export { deleteProduct };