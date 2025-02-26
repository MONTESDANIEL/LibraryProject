import axios from 'axios';

// Configuración base para las solicitudes
const API_BASE_URL = 'http://192.168.1.3:8081/api/book';

export const listAllBooks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/listAllBooks`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const addBook = async (bookData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addBook`, bookData);
        return response.data.message;
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (bookData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateBook`, bookData);
        return response.data.message;
    } catch (error) {
        throw error;
    }
};

export const deleteBook = async (bookId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteBook/${bookId}`);
        return response.data.message;
    } catch (error) {
        throw error;
    }
};


