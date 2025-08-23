import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = ({ product }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-w-1 aspect-h-1">
        <LazyLoadImage
          src={product.image}
          alt={product.name}
          effect="blur"
          className="object-cover w-full h-full"
          wrapperClassName="w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Añadir al carrito
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;