"use client";
import { Fetcher } from "@/app/libs";
import useSWR from "swr";

const ViewProduct = ({ params }: { params: { id: number } }) => {
  const {
    data: product,
    isLoading,
    error,
  } = useSWR(`/api/products/${params.id}`, Fetcher);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSWR(`/api/categories`, Fetcher);

  const getCategory = (id: number) => {
    if (categories && categories.length > 0) {
      const category = categories.find((category: any) => category.id == id);
      return category.nombre;
    }
    return null;
  }

  if (isLoading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  if (!product) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full">
        <h2 className="text-center font-bold text-3xl py-3">{product.nombre}</h2>
        <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md mb-3">
          <p>Cantidad disponible: {product.cantidadDisponible}</p>
        </div>
        <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md mb-3">
          <p>Descripcion: {product.descripcion}</p>
        </div>
        <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md mb-3">
          <p>Codigo: {product.codigo}</p>
        </div>
        <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md mb-3">
          <p>Categoria: {getCategory(product.idCategoria)}</p>
        </div>
      </div>
    </div>
  );
};
export default ViewProduct;
