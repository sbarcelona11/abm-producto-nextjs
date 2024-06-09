export interface CategoryModel {
    id: number;
    activa: boolean;
    nombre: string;
    deleteCategory: (id:number)=>void;
}
export  interface ProductModel {
    id: number;
    nombre: string;
    cantidadDisponible: number;
    codigo: string;
    descripcion: string;
    fechaAlta: string;
    fechaBaja: string;
    categoria: CategoryModel;
    deleteProduct: (id:number)=>void;
}