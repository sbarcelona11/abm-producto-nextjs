import React from "react";
import Link from "next/link";
import { CategoryModel } from "../types";

const Categories = (params: CategoryModel) => {
  return (
    <tr>
      <td className="py-4 px-6 border-b border-gray-200">{params.id}</td>
      <td className="py-4 px-6 border-b border-gray-200 truncate">
        {params.nombre}
      </td>
      <td className="py-4 px-6 border-b border-gray-200">
        {/* I need to change the color */}
        {params.activa ? (
          <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
            Activa
          </span>
        ) : (
          <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
            Inactiva
          </span>
        
        )}
      </td>
      <td className="py-4 px-6 border-b border-gray-200">
        <span
          onClick={() => params.deleteCategory(params.id)}
          className="bg-red-500 p-2 inline-block text-white text-sm"
        >
          Borrar
        </span>
        <Link
          href={`/categories/edit/${params.id}`}
          className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
        >
          Editar
        </Link>
        <Link
          href={`/categories/read/${params.id}`}
          className="bg-blue-500 p-2 inline-block ml-3 text-white text-sm"
        >
          Ver
        </Link>
      </td>
    </tr>
  );
};

export default Categories;
