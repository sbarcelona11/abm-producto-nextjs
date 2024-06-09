"use client";
import React, { useEffect, useState } from "react";
import { CategoryModel } from "../types";
import useSWR from "swr";
import Link from "next/link";
import { Fetcher } from "../libs";
import Categories from "../components/Categories";
const Category = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const { data, error, isLoading } = useSWR<any>(`/api/categories`, Fetcher);

  useEffect(() => {
    if (data) {
      // order by id
      const categories = data.sort((a: CategoryModel, b: CategoryModel) => a.id - b.id)
      setCategories(categories);
    }
  }, [data, isLoading]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  let deleteCategory = async (id: number) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const content = await res.json();

    if (res) {
      setCategories(
        categories?.filter((category: CategoryModel) => {
          return category.id !== id;
        })
      );
    }
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <div className="flex justify-between items-center">
        <Link
          href={`/categories/create`}
          className="bg-green-500 p-2 inline-block text-white"
        >
          Agregar
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
              Estado
            </th>
            <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {categories &&
            categories.map((item: CategoryModel) => (
              <Categories
                key={item.id}
                {...item}
                deleteCategory={deleteCategory}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
