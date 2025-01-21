import axios from 'axios';
import baseURL from '../../../../../assets/common/baseURL'

const updateUser = async ({ _id, email, name, role, avatar }) => {
    try {
        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('role', role);

        // console.log("This is form data", formData)
        if (avatar) {
            const fileName = avatar.split('/').pop();
            formData.append('avatar', {
                uri: avatar,
                type: 'image/jpeg',
                name: fileName,
            });
        }
        // console.log('This form data', formData)
        const response = await axios.put(`${baseURL}/user-update`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        // console.log("Complete Response in API:", response); 
        return response.data;
    } catch (error) {
        console.error("Update error: at UpdateAPI", error.response?.data || error.message.error);
        throw error;
    }
};


export { updateUser };