import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL'

const createPost = async ({ title, category, content, image }) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', content);


        if (image) {
            const fileName = image.split('/').pop();
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: fileName,
            });
        }

        // console.log(formData)

        const response = await axios.post(`${baseURL}/article/create-post`,formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            
        );

        return response.data;
    } catch (error) {
        console.error("Registration error: at registerAPI", error.response?.data || error.message);
        throw error;
    }
};


export { createPost };