import React from 'react';
import { useForm } from 'react-hook-form';
import { useCartStore } from '../store';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
    const { items, total, clearCart } = useCartStore();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = React.useState(1);
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Mock Delivery Fee Calculation
    const deliveryFee = 150;
    const finalTotal = total() + deliveryFee;

    const onShippingSubmit = (data) => {
        setStep(2);
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // Mock Paystack Popup
            const isConfirmed = window.confirm(`Paystack Mock: Confirm payment of GH₵ ${finalTotal.toLocaleString()}?`);

            if (isConfirmed) {
                await api.orders.create({
                    items,
                    total: finalTotal,
                    deliveryFee
                });
                clearCart();
                toast.success("Order placed successfully!");
                navigate('/'); // Should go to Order History or Confirmation page
            } else {
                toast.error("Payment cancelled");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) return <div className="p-20 text-center">Your cart is empty</div>;

    return (
        <div className="container py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 w-full h-1 bg-muted -z-10" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>1</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>2</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-muted'}`}>3</div>
            </div>

            {step === 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input {...register("firstName", { required: true })} />
                                    {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input {...register("lastName", { required: true })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input {...register("phone", { required: true })} />
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-medium">Region</label>
                                <select {...register("region", { required: true })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="Accra">Accra</option>
                                    <option value="Kumasi">Kumasi</option>
                                    <option value="Tamale">Tamale</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Delivery Address</label>
                                <Input {...register("address", { required: true })} placeholder="House number, Street name" />
                            </div>
                            <Button type="submit" className="w-full">Continue to Payment</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {step === 2 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Payment & Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>GH₵ {item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 flex justify-between">
                                <span>Delivery Fee</span>
                                <span>GH₵ {deliveryFee}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                <span>Total to Pay</span>
                                <span>GH₵ {finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="p-4 border rounded bg-muted/20 text-sm">
                            <p>You will be redirected to Paystack to complete your secure payment.</p>
                        </div>

                        <div className="flex gap-4">
                             <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                             <Button className="flex-1" onClick={handlePayment} disabled={isProcessing}>
                                {isProcessing ? "Processing..." : "Pay Now"}
                             </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
