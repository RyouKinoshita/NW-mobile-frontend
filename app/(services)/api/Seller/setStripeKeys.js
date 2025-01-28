import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL'

const setStripeKeys = async ({ _id, stripeSecretKey, stripePublishableKey }) => {
    try {

        const response = await axios.put(`${baseURL}/set-stripe-keys`, {
            _id, stripeSecretKey, stripePublishableKey
        },
        );

        return response.data;
    } catch (error) {
        console.error("Add Seller Stripe Frontend API error:", error.response?.data || error.message);
        throw error;
    }
};

export { setStripeKeys };