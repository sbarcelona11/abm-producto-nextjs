"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Fetcher } from "@/app/libs";
import useSWR from "swr";
import { CategoryModel } from "@/app/types";

const ProductEdit = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
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

  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.nombre);
      setCategory(product.idCategoria);
      setQuantity(product.cantidadDisponible);
      setCode(product.codigo);
      setDescription(product.descripcion);
    }
  }, [product, isLoading]);

  const updateProducts = async (e: any) => {
    e.preventDefault();
    if (name != "" && quantity != 0 && code != "" && description != "" && category != 0) {
      const formData = {
        id: Number(params.id),
        nombre: name,
        cantidadDisponible: quantity,
        codigo: code,
        descripcion: description,
        idCategoria: Number(category),
      };

      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const content = res
      if (content.status === 200) {
        router.push("/products");
      }
    }
  };

  if (!product) return null;
  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="flex justify-center items-center w-full  h-screen">
      <form className="w-4/12 bg-white p-10" onSubmit={updateProducts}>
        <span className="font-bold text-black py-2 block underline text-2xl">
          Editar
        </span>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm text-black font-bold py-2 block">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            className="w-full  text-black border-[1px] border-gray-200 p-2 rounded-sm"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm text-black font-bold py-2 block">
            Cantidad
          </label>
          <input
          type="number"
            name="cantidadDisponible"
            className="w-full text-black border-[1px] border-gray-200 p-2 rounded-sm"
            value={quantity}
            onChange={(e: any) => setQuantity(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm text-black font-bold py-2 block">
            Codigo
          </label>
          <input
            name="codigo"
            className="w-full text-black border-[1px] border-gray-200 p-2 rounded-sm"
            value={code}
            onChange={(e: any) => setCode(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm text-black font-bold py-2 block">
            Descripcion
          </label>
          <input
            name="descripcion"
            className="w-full text-black border-[1px] border-gray-200 p-2 rounded-sm"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm text-black font-bold py-2 block">
            Categoria
          </label>
          <select
            name="categoria"
            className="w-full text-black border-[1px] border-gray-200 p-2 rounded-sm"
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}>
            { categories && categories.map((categoryMap: CategoryModel) => (
              <option key={categoryMap.id} value={categoryMap.id} defaultValue={category}>
                {categoryMap.nombre}
              </option>
            ))}
            </select>
        </div>

        <div className="w-full py-2">
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
