import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/cart`;

const getCart = async () => {
    const { data } = await axios.get(API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return data;
};

const addToCart = async (productId, quantity) => {
    const { data } = await axios.post(`${API_URL}/add`, { productId, quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return data;
};

const updateQuantity = async (productId, quantity) => {
    const { data } = await axios.put(`${API_URL}/${productId}`, { quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return data;
};

const removeItem = async (productId) => {
    const { data } = await axios.delete(`${API_URL}/${productId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return data;
};

const checkout = async () => {
    const { data } = await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return data;
};

export const cartService = { getCart, addToCart, updateQuantity, removeItem, checkout };