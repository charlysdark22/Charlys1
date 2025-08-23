import React from "react";
import { Link, useParams } from "react-router-dom";
import FeaturedCategories from "../components/FeaturedCategories";
import FeaturedProducts from "../components/FeaturedProducts";
import products from "../data/products";
import "./Home.css"; // Optional: for custom styles

const promoBlocks = [
  {
    slogan: "¡Tecnología que te impulsa!",
    description: "Descubre los últimos smartphones y laptops.",
    link: "/products/1",
    button: "Ver productos",
    color: "bg-blue-100",
  },
  {
    slogan: "Ofertas exclusivas en audio",
    description: "Auriculares y parlantes con descuentos especiales.",
    link: "/products/2",
    button: "Ver audio",
    color: "bg-green-100",
  },
  {
    slogan: "Gadgets para tu día a día",
    description: "Smartwatches, accesorios y más.",
    link: "/products/3",
    button: "Ver gadgets",
    color: "bg-yellow-100",
  },
];

export default function Home() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Slogan blocks */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          {promoBlocks.map((block, idx) => (
            <div
              key={idx}
              className={`rounded-xl shadow-lg p-6 ${block.color} flex flex-col md:flex-row items-center justify-between transition hover:scale-105`}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {block.slogan}
                </h2>
                <p className="text-gray-600 mb-4">{block.description}</p>
              </div>
              <Link
                to={block.link}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                {block.button}
              </Link>
            </div>
          ))}
        </div>
        {/* Featured categories */}
        <div className="flex-1">
          <FeaturedCategories />
        </div>
      </div>
      {/* Featured products */}
      <div className="container mx-auto px-4 py-8">
        <FeaturedProducts />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="w-64 mb-4 rounded"
        />
        <p className="text-lg mb-2">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600 mb-4">
          ${product.price}
        </p>
        {/* Add to cart button, etc. */}
      </div>
    </div>
  );
}