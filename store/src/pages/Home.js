// src/pages/Home.jsx
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
    </>
  );
}