import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/components/ProductCard";
import {
  getFeaturedProducts,
  getProductsByCategory,
} from "@/services/DataService";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [headsets, setHeadsets] = useState<Product[]>([]);
  const [cameras, setCameras] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const featured = await getFeaturedProducts();
        setFeaturedProducts(featured);

        // Fetch category products for showcase
        const headsetProducts = await getProductsByCategory("Headsets");
        setHeadsets(headsetProducts);

        const cameraProducts = await getProductsByCategory("Cameras");
        setCameras(cameraProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categories = [
    {
      name: "Headsets",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FtaW5nJTIwaGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D",
      link: "/category/headsets",
    },
    {
      name: "Ring Lights",
      image:
        "https://images.unsplash.com/photo-1603574670812-d24560880210?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmluZyUyMGxpZ2h0fGVufDB8fDB8fHww",
      link: "/category/ring-lights",
    },
    {
      name: "Cameras",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHNsciUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
      link: "/category/cameras",
    },
    {
      name: "Mice",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
      link: "/category/mice",
    },
    {
      name: "Home Tools",
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9vbCUyMGtpdHxlbnwwfHwwfHx8MA%3D%3D",
      link: "/category/home-tools",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-atj text-white">
          <div className="container mx-auto py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Premium Tech & Tools for Every Need
              </h1>
              <p className="text-lg mb-8 text-gray-100">
                Discover high-quality gadgets and tools for work, gaming,
                streaming, and home projects.
              </p>
              <div className="flex space-x-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-white text-atj hover:bg-gray-100"
                  >
                    Shop Now
                  </Button>
                </Link>
                <Link to="/track-order">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white hover:text-atj"
                  >
                    Track Order
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2glMjBnYWRnZXRzfGVufDB8fDB8fHww"
                alt="Tech Gadgets"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium">
                Featured Products
              </h2>
              <Link
                to="/products"
                className="text-atj hover:text-atj-light flex items-center"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.link}
                  className="group block relative overflow-hidden rounded-lg shadow-md aspect-square"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <h3 className="text-white text-xl font-medium">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Headsets Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium">
                Premium Headsets
              </h2>
              <Link
                to="/category/headsets"
                className="text-atj hover:text-atj-light flex items-center"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {headsets.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Cameras Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium">Pro Cameras</h2>
              <Link
                to="/category/cameras"
                className="text-atj hover:text-atj-light flex items-center"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cameras.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Info Banners */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                <div className="bg-atj/10 p-4 rounded-full mr-4">
                  <ShoppingBag className="text-atj" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over $100</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                <div className="bg-atj/10 p-4 rounded-full mr-4">
                  <ShoppingBag className="text-atj" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Secure Payments</h3>
                  <p className="text-sm text-gray-500">100% secure checkout</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                <div className="bg-atj/10 p-4 rounded-full mr-4">
                  <ShoppingBag className="text-atj" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
