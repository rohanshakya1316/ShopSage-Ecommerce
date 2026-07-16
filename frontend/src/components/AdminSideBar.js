const AdminSideBar = () => {
  return (
    <aside className="w-64 bg-white shadow-md shrink-0 flex flex-col transition-all duration-300 z-20 md:flex">
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <a
              href="#"
              className="flex items-center px-6 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
            >
              <i className="fa-solid fa-gauge-high w-5" />
              <span className="ml-3 font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-6 py-3 text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600 transition-colors"
            >
              <i className="fa-solid fa-box w-5" />
              <span className="ml-3 font-medium">Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-6 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
            >
              <i className="fa-solid fa-cart-shopping w-5" />
              <span className="ml-3 font-medium">Orders</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
