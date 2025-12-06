import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguageStore, translations } from '../store/language';

export function ProductList() {
    const { language } = useLanguageStore();
    const t = translations[language];
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: api.products.list
    });

    if (isLoading) return <div className="flex justify-center p-20">Loading...</div>;

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-5 w-5" />
                        <h2 className="font-semibold text-lg">{t.filters}</h2>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <Accordion type="single" collapsible className="w-full px-4">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>{t.region}</AccordionTrigger>
                                    <AccordionContent>
                                         <div className="space-y-2">
                                            <label className="flex items-center space-x-2 text-sm">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span>Accra</span>
                                            </label>
                                             <label className="flex items-center space-x-2 text-sm">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span>Kumasi</span>
                                            </label>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-2">
                                    <AccordionTrigger>{t.priceRange}</AccordionTrigger>
                                    <AccordionContent>
                                         <div className="space-y-2">
                                            <label className="flex items-center space-x-2 text-sm">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span>Under GH₵ 500</span>
                                            </label>
                                             <label className="flex items-center space-x-2 text-sm">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span>GH₵ 500 - 1000</span>
                                            </label>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <Input placeholder={t.searchPlaceholder} className="max-w-md" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {data?.documents?.map((product, index) => (
                             <motion.div
                                key={product.$id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                             >
                                <Link to={`/products/${product.$id}`}>
                                    <Card className="h-full hover:shadow-lg transition-shadow">
                                         <div className="aspect-square relative bg-muted">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="object-cover w-full h-full rounded-t-lg"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                            <p className="text-primary font-bold mb-2">GH₵ {product.price}</p>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {product.location.region}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
