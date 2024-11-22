import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadCartFromStorage = async () => {
    try {
        const cartData = await AsyncStorage.getItem('cartItems');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Failed to load cart items', error);
        return [];
    }
};

const saveCartToStorage = async (cartItems) => {
    try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
        console.error('Failed to save cart items', error);
    }
};

const initialState = {
    items: [],
    userId: null,
    loading: true,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setCart: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        addToCart: (state, action) => {
            const newItem = {
                ...action.payload,
                addedAt: new Date().getTime(),
            };
            state.items.push(newItem);
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
            saveCartToStorage(state.items);
            AsyncStorage.getItem('cartItems').then(cartData => {
                console.log('Cart after AsyncStorage update:', JSON.parse(cartData)); 
            });
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToStorage(state.items);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setCart, addToCart, removeFromCart, clearCart, setLoading, setUserId } = cartSlice.actions;

export default cartSlice.reducer;

export const loadCart = () => async (dispatch) => {
    dispatch(setLoading(true));
    const cartItems = await loadCartFromStorage();
    dispatch(setCart(cartItems));
};

