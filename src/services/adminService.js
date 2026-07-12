const API_BASE_URL = import.meta.env.VITE_API_URL;
const ADMIN_PRODUCTS_URL = `${API_BASE_URL}/admin/products`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-auth-token': token
    };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return response.json();
};

export const adminService = {
    getDashboard: () => fetch(`${API_BASE_URL}/dashboard`, {
        headers: getAuthHeaders()
    }).then(res => res.json()),

    getProducts: () => fetch(ADMIN_PRODUCTS_URL, {
        headers: getAuthHeaders()
    }).then(res => res.json()),

    createProduct: async (data) => {
        const response = await fetch(ADMIN_PRODUCTS_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    updateProduct: async (id, data) => {
        const response = await fetch(`${ADMIN_PRODUCTS_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    deleteProduct: (id) => fetch(`${ADMIN_PRODUCTS_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(res => res.json()),

    toggleProduct: (id, isActive) => {
    console.log("Enviando a:", `${ADMIN_PRODUCTS_URL}/${id}/toggle`, "con data:", { active: isActive });
    return fetch(`${ADMIN_PRODUCTS_URL}/${id}/toggle`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ active: isActive })
    }).then(res => res.json());
},

    getOrders: (status) => {
        const url = status ? `${API_BASE_URL}/orders?status=${status}` : `${API_BASE_URL}/orders`;
        return fetch(url, { headers: getAuthHeaders() }).then(res => res.json());
    },

    updateOrderStatus: (id, status) => fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
    }).then(res => res.json())
};