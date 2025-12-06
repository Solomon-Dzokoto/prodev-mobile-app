import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function LandingPage() {
    const { data: products } = useQuery({
        queryKey: ['featured-products'],
        queryFn: api.products.list
    });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                Find the Perfect Rest Nearby
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discreet, reliable, and dignified coffin delivery from local Ghanaian artisans.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="flex-1" placeholder="Search by region or type..." type="text" />
                <Button type="submit">Search</Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Featured Coffins</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
             {products?.documents?.slice(0, 4).map((product, index) => (
                 <motion.div
                    key={product.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                 >
                    <Link to={`/products/${product.$id}`}>
                        <Card className="h-full overflow-hidden hover:scale-105 transition-transform duration-200">
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-bold text-primary">GH₵ {product.price}</span>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {product.location.region}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                 </motion.div>
             ))}
          </div>
          <div className="mt-12 text-center">
             <Link to="/products">
                <Button size="lg" className="animate-pulse">Browse All Products</Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
