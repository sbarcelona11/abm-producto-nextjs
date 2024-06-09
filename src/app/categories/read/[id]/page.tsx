"use client";
import { Fetcher } from "@/app/libs";
import useSWR from "swr";
import Products from "../../page";

const ViewCategory = ({ params }: { params: { id: number } }) => {
  const {
    data: category,
    isLoading,
    error,
  } = useSWR(`/api/categories/${params.id}`, Fetcher);

  if (isLoading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  if (!category) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full">
        <h2 className="text-center font-bold text-3xl py-3">{category.nombre}</h2>
        <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md mb-3">
          <p>Estado: {category.activa ? "Activa" : "Inactiva"}</p>
        </div>
      </div>
    </div>
  );
};
export default ViewCategory;
