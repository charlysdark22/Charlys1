// src/pages/Home.jsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}