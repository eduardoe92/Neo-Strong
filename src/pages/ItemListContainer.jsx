import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import FilterSearch from "../components/shop/FilterSearch.jsx";
import ProductGrid from "../components/shop/ProductGrid.jsx";
import Pagination from "../components/shop/Pagination.jsx";

const ItemListContainer = () => {
  const { categoria } = useParams();
  const { data: productos, loading, error } = useFetch("/data/productos.json");

  const itemsPorPagina = 6;

  const [busqueda, setBusqueda] = useState(() => {
    return sessionStorage.getItem("neo_busqueda") || "";
  });
  
  const [ordenPrecio, setOrdenPrecio] = useState(() => {
    return sessionStorage.getItem("neo_orden") || "";
  });
  
  const [paginaActual, setPaginaActual] = useState(() => {
    const ultimaCategoria = sessionStorage.getItem("neo_ultima_categoria") || "";
    const categoriaActualNormalizada = categoria || "";
    
    if (categoriaActualNormalizada !== ultimaCategoria) {
      return 1;
    }
    
    const guardada = sessionStorage.getItem("neo_pagina");
    return guardada ? parseInt(guardada, 10) : 1;
  });

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
      <div className="container px-4 py-12 mx-auto">
        <div className="w-64 h-10 mx-auto mb-10 border rounded-full border-neos/30 bg-strong animate-pulse" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-neos/30 h-96 bg-strong rounded-4xl animate-pulse" />
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

  let productosProcesados = categoria
    ? productos.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase())
    : productos;

  if (busqueda.trim() !== "") {
    const termino = busqueda.toLowerCase();
    productosProcesados = productosProcesados.filter(
      (p) =>
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino)
    );
  }

  if (ordenPrecio === "menor-mayor") {
    productosProcesados = [...productosProcesados].sort((a, b) => a.precio - b.precio);
  } else if (ordenPrecio === "mayor-menor") {
    productosProcesados = [...productosProcesados].sort((a, b) => b.precio - a.precio);
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