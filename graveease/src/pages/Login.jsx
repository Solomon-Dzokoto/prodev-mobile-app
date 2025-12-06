import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { toast } from 'sonner';

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        const user = await api.auth.login(data.email, data.password);
        if (user) {
            login(user);
            toast.success(`Welcome back, ${user.name || 'User'}`);
            if (user.role === 'seller') navigate('/seller');
            else if (user.role === 'admin') navigate('/admin');
            else navigate('/');
        } else {
            toast.error('Invalid credentials');
        }
    } catch (error) {
        toast.error('Login failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            placeholder="m@example.com"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500 text-xs">Required</span>}
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500 text-xs">Required</span>}
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <p className="text-muted-foreground">Demo Accounts:</p>
                    <p>Buyer: user@example.com / password</p>
                    <p>Seller: seller@example.com / password</p>
                    <p>Admin: admin@example.com / password</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
