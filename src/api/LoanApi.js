import axios from 'axios';

// Configuración base para las solicitudes
const API_BASE_URL = 'http://192.168.1.3:8081/api/loan';

export const createLoan = async (loanData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createLoan`, loanData);
        return response.data.message;
    } catch (error) {
        throw error;
    }
};

export const listLoans = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/listLoans`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
