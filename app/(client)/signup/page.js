'use client';

import { redirect, useRouter } from 'next/navigation';
import { signup } from './actions';

import Title from '@/components/Title';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import toast from 'react-hot-toast';

const signupFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .email('Please enter a valid email address'),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
  confirmPassword: z.string(1, {
    message: 'Passwords must match.',
  }),
});

export default function Page() {
  useUser([], { redirectTo: '/', redirectIfFound: true });

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values) {
    const email = values.email.toLowerCase();
    const password = values.password;
    try {
      const res = await signup({ email, password });

      if (res.success) {
        toast.success('User created. Login with your email.');
        router.push('/profile');
      }
      if (res.field) {
        form.setError(res.field, { type: 'string', message: res.message });
      }
      if (res.error) {
        console.log('error');
        form.setError('custom', { type: 'string', message: res.message });
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      form.setError('custom', { type: 'string', message: error.message });
    }
  }

  return (
    <div className="w-64 max-w-lg mx-auto">
      <Title h1 className="text-center">
        Sign Up
      </Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Sign Up</Button>
          <Button variant="secondary" asChild className="ml-2">
            <Link href="/login">Log In</Link>
          </Button>
        </form>
      </Form>
    </div>
  );
}
