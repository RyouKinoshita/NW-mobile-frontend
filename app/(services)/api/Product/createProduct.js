import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL'

const createProduct = async ({ name, price, category, description, quality, sack, location, userId, images }) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('quality', quality);
        formData.append('sack', sack);
        formData.append('location', location);
        formData.append('user', userId);

        if (images) {
            const fileName = images.split('/').pop();
            formData.append('image', {
                uri: images,
                type: 'image/jpeg',
                name: fileName,
            });
        }

        // console.log(formData)

        const response = await axios.post(`${baseURL}/product/create-product`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Create Product error: at Create Product API", error.response?.data || error.message);
        throw error;
    }
};


export { createProduct };