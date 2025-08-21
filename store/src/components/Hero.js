// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          La Mejor Tecnología a Tu Alcance
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Computadoras, laptops, teléfonos y accesorios de las mejores marcas
        </p>
        <a
          href="/productos"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Ver Productos
        </a>
      </div>
    </section>
  );
}