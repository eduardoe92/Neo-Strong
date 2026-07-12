import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../services/productService.js";
import FilterSearch from "../components/shop/FilterSearch.jsx";
import ProductGrid from "../components/shop/ProductGrid.jsx";
import Pagination from "../components/shop/Pagination.jsx";

const ItemListContainer = () => {
  const { categoria } = useParams();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPorPagina = 6;

  const [busqueda, setBusqueda] = useState(() => {
    return sessionStorage.getItem("neo_busqueda") || "";
  });

  const [ordenPrecio, setOrdenPrecio] = useState(() => {
    return sessionStorage.getItem("neo_orden") || "";
  });

  const [paginaActual, setPaginaActual] = useState(() => {
    const ultimaCategoria =
      sessionStorage.getItem("neo_ultima_categoria") || "";
    const categoriaActualNormalizada = categoria || "";

    if (categoriaActualNormalizada !== ultimaCategoria) {
      return 1;
    }

    const guardada = sessionStorage.getItem("neo_pagina");
    return guardada ? parseInt(guardada, 10) : 1;
  });

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProductos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("neo_busqueda", busqueda);
  }, [busqueda]);

  useEffect(() => {
    sessionStorage.setItem("neo_orden", ordenPrecio);
  }, [ordenPrecio]);

  useEffect(() => {
    sessionStorage.setItem("neo_pagina", paginaActual.toString());
    sessionStorage.setItem("neo_ultima_categoria", categoria || "");
  }, [paginaActual, categoria]);

  if (loading) {
    return (
      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 space-y-4 text-center">
          <div className="w-12 h-12 border-4 rounded-full border-t-neos border-gray-700/50 animate-spin" />
          <div className="space-y-1">
            <h3 className="text-xl font-black tracking-wide text-gray-200 uppercase">
              Sincronizando Catálogo
            </h3>
            <p className="max-w-xs mx-auto text-sm font-medium leading-relaxed text-gray-400">
              Conectando con el servidor. Esto puede tomar unos segundos...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex flex-col p-5 space-y-4 border border-neos/10 h-96 bg-strong/60 rounded-4xl animate-pulse"
            >
              <div className="w-full h-56 bg-fondo/50 rounded-3xl" />
              <div className="w-3/4 h-6 rounded-md bg-fondo/50" />
              <div className="flex-1 w-full h-12 rounded-md bg-fondo/50" />
              <div className="w-full h-12 rounded-full bg-fondo/50" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md p-6 py-20 mx-auto my-10 font-bold tracking-wide text-center text-red-500 border bg-strong/40 border-red-900/30 rounded-3xl">
        Fallo de sincronización: {error}
      </div>
    );
  }

  let productosProcesados = productos;

  if (categoria) {
    productosProcesados = productosProcesados.filter(
      (p) => p.categoria?.toLowerCase() === categoria.toLowerCase(),
    );
  }

  if (busqueda.trim() !== "") {
    const termino = busqueda.toLowerCase();
    productosProcesados = productosProcesados.filter(
      (p) =>
        (p.nombre?.toLowerCase().includes(termino) || 
         p.categoria?.toLowerCase().includes(termino)), 
    );
  }

  if (ordenPrecio === "menor-mayor") {
    productosProcesados = [...productosProcesados].sort(
      (a, b) => a.precio - b.precio,
    );
  } else if (ordenPrecio === "mayor-menor") {
    productosProcesados = [...productosProcesados].sort(
      (a, b) => b.precio - a.precio,
    );
  }

  const totalItems = productosProcesados.length;
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina) || 1;

  const paginaSegura = paginaActual > totalPaginas ? totalPaginas : paginaActual;

  const indiceUltimoItem = paginaSegura * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const itemsAMostrar = productosProcesados.slice(indicePrimerItem, indiceUltimoItem);

  return (
    <div className="container px-4 py-12 mx-auto">
      
      <h2 className="mb-4 text-3xl font-black tracking-tighter text-center text-gray-100 uppercase md:text-4xl">
        {categoria ? (
          <span>
            Categoría:{" "}
            <span className="text-transparent bg-linear-to-r from-neos to-orange-500 bg-clip-text">
              {categoria}
            </span>
          </span>
        ) : (
          <span className="text-gray-300 bg-linear-to-r to-orange-500 bg-clip-text">
            Catálogo
          </span>
        )}
      </h2>

      <FilterSearch
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        setPaginaActual={setPaginaActual}
        ordenPrecio={ordenPrecio}
        setOrdenPrecio={setOrdenPrecio}
      />

      <ProductGrid
        items={itemsAMostrar}
        limpiarFiltro={() => {
          setBusqueda("");
          setOrdenPrecio("");
          setPaginaActual(1);
        }}
      />

      <Pagination
        paginaActual={paginaSegura}
        totalPaginas={totalPaginas}
        setPaginaActual={setPaginaActual}
      />
      
    </div>
  );
};

export default ItemListContainer;