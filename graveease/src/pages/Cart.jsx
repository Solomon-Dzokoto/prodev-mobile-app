import React from 'react';
import { useCartStore } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Cart() {
    const { items, removeItem, updateQuantity, total } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products">
                    <Button>Browse Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.id}>
                            <CardContent className="p-4 flex gap-4">
                                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded bg-muted" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                    <p className="text-primary font-medium">GH₵ {item.price}</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                         <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold text-lg">Order Summary</h3>
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>GH₵ {total().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Estimated Delivery</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>GH₵ {total().toLocaleString()}</span>
                            </div>
                            <Link to="/checkout" className="block w-full">
                                <Button className="w-full" size="lg">Proceed to Checkout</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
