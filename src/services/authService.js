const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/auth`;

export const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al iniciar sesión.");
        }

        return data;
    },

    register: async (userData) => {
        const payload = {
            name: userData.nombre,
            email: userData.email,
            phone: userData.telefono,
            address: userData.direccion,
            birthDate: userData.fechaNacimiento,
            password: userData.password
        };

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || data.message || "Error al registrar la cuenta.");
        }

        return data;
    },
    getProfile: async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener perfil.");
        return data;
    },

    updateProfile: async (userData) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar perfil.");
        return data;
    },
};