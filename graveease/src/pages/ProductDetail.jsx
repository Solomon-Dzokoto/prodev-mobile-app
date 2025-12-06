import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCartStore } from '../store';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => api.products.get(id)
    });

    if (isLoading) return <div className="p-20 text-center">Loading details...</div>;
    if (!product) return <div className="p-20 text-center">Product not found</div>;

    const handleAddToCart = () => {
        addItem(product);
        toast.success("Added to cart");
    };

    const handleBuyNow = () => {
        addItem(product);
        navigate('/cart');
    }

    return (
        <div className="container py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-4">
                    <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between">
                             <h1 className="text-3xl font-bold">{product.name}</h1>
                             {product.ecoFriendly && <Badge variant="secondary">Eco-Friendly</Badge>}
                        </div>
                        <div className="flex items-center text-muted-foreground mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {product.location.region}
                        </div>
                    </div>

                    <div className="text-2xl font-bold text-primary">
                        GH₵ {product.price.toLocaleString()}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">
                        {product.description}
                    </p>

                    <div className="border rounded-lg p-4 bg-muted/20 space-y-3">
                         <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5 text-primary" />
                            <span className="font-medium">Delivery Estimate</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Enter your location at checkout for precise delivery fees. usually delivered within 2-4 days.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button className="flex-1" size="lg" onClick={handleBuyNow}>Buy Now</Button>
                        <Button variant="outline" size="lg" onClick={handleAddToCart}>Add to Cart</Button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Verified Seller • Secure Payment via Paystack</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
