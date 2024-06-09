"use client";
import React, { useEffect, useState } from "react";
import { default as ProductComponents } from "../components/Products";
import { ProductModel } from "../types";
import useSWR from "swr";
import Link from "next/link";
import { Fetcher } from "../libs";
const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { data, error, isLoading } = useSWR<any>(`/api/products`, Fetcher);

  useEffect(() => {
    if (data && data.result) {
      // order by id
      const product = data.result.sort((a: ProductModel, b: ProductModel) => a.id - b.id)
      setProducts(product);
    }
  }, [data, isLoading]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  let deleteProduct = async (id: number) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const content = await res.json();

    if (res) {
      setProducts(
        products?.filter((post: ProductModel) => {
          return post.id !== id;
        })
      );
    }
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <div className="flex justify-between items-center">
        <Link
          href={`/products/create`}
          className="bg-green-500 p-2 inline-block text-white"
        >
          Create
        </Link>
      </div>

      <table className="w-full table-fixed text-black mt-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              ID
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Nombre
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Cantidad Disponible
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Codigo
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Categoria
            </th>
            <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {products &&
            products.map((item: ProductModel) => (
              <ProductComponents
                key={item.id}
                {...item}
                deleteProduct={deleteProduct}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
