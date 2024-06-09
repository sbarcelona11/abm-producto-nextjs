"use client";
import React, {useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CategoriesCreate = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<number>(0);

  const addCategory = async (e: any) => {
    e.preventDefault();
    if (name != "") {
      const formData = {
        nombre: name,
        activa: active,
      };
      const add = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (add && add.status == 200) {
        router.push("/categories");
      }
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="w-4/12 bg-white p-10" onSubmit={addCategory}>
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
            Activa
          </label>
          <select
            name="activa"
            className="w-full text-black border-[1px] border-gray-200 p-2 rounded-sm"
            value={Number(active)}
            onChange={(e: any) => setActive(e.target.value)}
          >
            <option value={0}>Activa</option>
            <option value={1}>Inactiva</option>
          </select>
        </div>
        <div className="w-full py-2">
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriesCreate;
