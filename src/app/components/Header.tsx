
const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="font-bold text-2xl lg:text-4xl">
          CRUDs
        </a>
        <nav>
          <ul className={`sm:flex block`}>
            <li className="text-xl">
              <a
                href="/"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md"
              >
                Productos
              </a>
            </li>
            <li className="text-xl">
              <a
                href="/products/create"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md"
              >
                Agregar Producto
              </a>
            </li>
            <li className="text-xl">
              <a
                href="/categories"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md"
              >
                Categorias
              </a>
            </li>
            <li className="text-xl">
              <a
                href="/categories/create"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md"
              >
                Agregar Categoria
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
