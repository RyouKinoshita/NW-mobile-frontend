import axios from 'axios';
import baseURL from '../../../../../assets/common/baseURL';

const deleteUser = async (_id) => {
    try {
        const response = await axios.delete(`${baseURL}/delete-user/${_id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        throw error;
    }
};

export { deleteUser };