import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Pending Sellers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <p className="font-medium">Kwame's Carpentry</p>
                                    <p className="text-sm text-muted-foreground">Accra, GH</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => toast.success("Approved")}>
                                        <Check className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => toast.error("Rejected")}>
                                        <X className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                             <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <p className="font-medium">Golden Gate Coffins</p>
                                    <p className="text-sm text-muted-foreground">Kumasi, GH</p>
                                </div>
                                <div className="flex gap-2">
                                     <Button size="icon" variant="outline" className="h-8 w-8">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <X className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Platform Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Sellers</span>
                            <span className="font-bold">24</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Orders</span>
                            <span className="font-bold">1,204</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Revenue</span>
                            <span className="font-bold">GH₵ 450,200</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
