// src/components/FeaturedCategories.jsx
export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Computadoras', desc: 'PCs de escritorio potentes', icon: '💻' },
            { name: 'Laptops', desc: 'Portátiles para trabajo y gaming', icon: '🖥️' },
            { name: 'Teléfonos', desc: 'Smartphones de última generación', icon: '📱' },
            { name: 'Accesorios', desc: 'Complementos y periféricos', icon: '🔌' },
          ].map((cat, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{cat.desc}</p>
              <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Ver Todo
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}