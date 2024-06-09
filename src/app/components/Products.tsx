import React from "react";
import Link from "next/link";
import { ProductModel } from "../types";

const Products = (params: ProductModel) => {
  return (
    <tr>
      <td className="py-4 px-6 border-b border-gray-200">{params.id}</td>

      <td className="py-4 px-6 border-b border-gray-200">
        {params.nombre ? params.nombre : ""}
      </td>
      <td className="py-4 px-6 border-b border-gray-200 truncate">
        {params.cantidadDisponible}
      </td>
      <td className="py-4 px-6 border-b border-gray-200">{params.codigo}</td>
      <td className="py-4 px-6 border-b border-gray-200">
        <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
          {params.categoria && params.categoria.nombre}
        </span>
      </td>
      <td className="py-4 px-6 border-b border-gray-200">
        <span
          onClick={() => params.deleteProduct(params.id)}
          className="bg-red-500 p-2 inline-block text-white text-sm"
        >
          Borrar
        </span>
        <Link
          href={`/products/edit/${params.id}`}
          className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
        >
          Editar
        </Link>
        <Link
          href={`/products/read/${params.id}`}
          className="bg-blue-500 p-2 inline-block ml-3 text-white text-sm"
        >
          Ver
        </Link>
      </td>
    </tr>
  );
};

export default Products;
