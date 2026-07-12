import { useState, useEffect, useCallback } from "react";
import { LuPlus } from "react-icons/lu";
import { adminService } from "../../services/adminService";
import ProductsTable from "../../components/admin/products/ProductsTable";
import ProductFormModal from "../../components/admin/products/ProductFormModal";
import AdminSearchBar from "../../components/admin/products/AdminSearchBar";
import NumericPagination from "../../components/admin/products/NumericPagination";

export default function AdminProductsView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const itemsPerPage = 8;

  const fetchProducts = useCallback(async () => {
    if (products.length === 0) setIsLoading(true);

    try {
      const data = await adminService.getProducts();
      const newProducts = Array.isArray(data)
        ? data
        : data.products || data.data || [];
      setProducts(newProducts);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [products.length]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      await fetchProducts();
    };
    const timer = setTimeout(() => {
      if (isMounted) load();
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fetchProducts]);

  const handleSaveProduct = async (productData) => {
    try {
      const payload = {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        brand: productData.brand,
        quantity: productData.quantity,
        stock: productData.stock,
        image_url: productData.image_url,
        description: productData.description,
        status: productData.status || "active",
      };

      if (productToEdit) {
        await adminService.updateProduct(
          productToEdit.id || productToEdit._id,
          payload,
        );
      } else {
        await adminService.createProduct(payload);
      }

      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error capturado en AdminProductsView:", error);
      return false;
    }
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`¿Seguro que quieres eliminar ${product.name}?`)) {
      try {
        await adminService.deleteProduct(product.id || product._id);
        await fetchProducts();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  const handleToggleStatus = async (product) => {
    const id = product.id || product._id;
    const nextActiveState = !product.active;

    try {
      await adminService.toggleProduct(id, nextActiveState);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id || p._id === id ? { ...p, active: nextActiveState } : p,
        ),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "price" || sortConfig.key === "stock") {
      valA = parseFloat(valA) || 0;
      valB = parseFloat(valB) || 0;
    } else {
      valA = String(valA || "").toLowerCase();
      valB = String(valB || "").toLowerCase();
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-white uppercase">
            Gestión de <span className="text-neos">Productos</span>
          </h1>
          <p className="text-gray-400">
            Crea, edita y administra tu catálogo completo.
          </p>
        </div>
        <button
          onClick={() => {
            setProductToEdit(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 text-sm font-black text-white uppercase transition-all rounded-xl bg-linear-to-r from-neos to-orange-600 hover:scale-105"
        >
          <LuPlus size={20} /> Nuevo Producto
        </button>
      </div>

      <AdminSearchBar
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        placeholder="Buscar por nombre o categoría..."
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="w-12 h-12 border-4 rounded-full border-t-neos border-gray-700/50 animate-spin" />
          <div className="mt-6 space-y-1">
            <h3 className="text-xl font-black tracking-wide text-gray-200 uppercase">
              Sincronizando Catálogo
            </h3>
            <p className="max-w-xs mx-auto text-sm font-medium leading-relaxed text-gray-400">
              Obteniendo productos del servidor. Por favor, espera un momento...
            </p>
          </div>
        </div>
      ) : (
        <ProductsTable
          products={paginatedProducts}
          onEdit={(p) => {
            setProductToEdit(p);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
          onToggleStatus={handleToggleStatus}
          onSort={(key) =>
            setSortConfig({
              key,
              direction:
                sortConfig.key === key && sortConfig.direction === "asc"
                  ? "desc"
                  : "asc",
            })
          }
          sortConfig={sortConfig}
        />
      )}

      <NumericPagination
        currentPage={currentPage}
        totalItems={sortedProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <ProductFormModal
          key={productToEdit ? productToEdit.id : "new"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          initialData={productToEdit}
        />
      )}
    </div>
  );
}
