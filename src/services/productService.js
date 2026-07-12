const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/products`;

export const productService = {
    getAllProducts: async () => {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al sincronizar el catálogo.");
        }

        return data
            .filter(p => p.active === true) 
            .map(p => ({
                id: p.id,
                nombre: p.name,
                precio: Number(p.price),
                descripcion: p.description,
                stock: p.stock,
                categoria: p.category || "Fitness",
                marca: p.brand || "Genérico",
                cantidad: p.presentation || null,
                imagen: p.image_url,
                active: p.active
            }));
    },

    getProductById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al cargar el detalle del producto.");
        }

        return {
            id: data.id,
            nombre: data.name,
            precio: Number(data.price),
            descripcion: data.description,
            stock: data.stock,
            categoria: data.category || "Fitness",
            marca: data.brand || "Genérico",
            cantidad: data.presentation || null,
            imagen: data.image_url,
            status: data.active
        };
    },

    getFavorites: async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/favorites`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) throw new Error("Error al obtener favoritos");
        return res.json();
    },

    addFavorite: async (productId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/favorites/add`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        });
        if (!res.ok) throw new Error("Error al agregar a favoritos");
        return res.json();
    },

    removeFavorite: async (productId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) throw new Error("Error al eliminar de favoritos");
        return res.json();
    },
    
    updateProductStatus: async (id, active) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ active })
        });
        if (response.ok) {
        window.dispatchEvent(new Event("favoritesUpdated"));
        window.dispatchEvent(new Event("cartUpdated"));
    }
    if (!response.ok) throw new Error("Error al actualizar el estado");
    return response.json();
}
};

