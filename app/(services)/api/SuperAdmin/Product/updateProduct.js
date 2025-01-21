import axios from 'axios';
import baseURL from '../../../../../assets/common/baseURL'

const updateProduct = async ({ _id, name, price, category, description, quality, sack, location, images }) => {
    try {
        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('quality', quality);
        formData.append('sack', sack);
        formData.append('location', location);

        // console.log("This is form data", formData)
        if (images) {
            const fileName = images.split('/').pop();
            formData.append('image', {
                uri: images,
                type: 'image/jpeg',
                name: fileName,
            });
        }
        // console.log('This form data', formData)
        const response = await axios.put(`${baseURL}/product/product-update`, formData,
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


export { updateProduct };