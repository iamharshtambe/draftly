'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { email, z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email('invlaid'),
  password: z.string().min(6, 'Password must contain atleast 6 characters'),
});

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      await signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
      });

      toast('Login success!');
      router.push('/');
    } catch (err: any) {
      toast(err.message || 'Login failed! Please try again later');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-white">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing In' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
