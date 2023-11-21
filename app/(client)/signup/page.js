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
import { useToast } from '@/components/ui/use-toast';

const signupFormSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  async function onSubmit(values) {
    const email = values.email.toLowerCase();
    const password = values.password;
    try {
      const res = await signup({ email, password });
      // const res = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (res.status === 200) {
      //   router.push('/login');
      // } else {
      //   // throw new Error(await res.text());
      // }
      if (res.success) {
        toast({
          title: 'User created.',
          description: 'Login with your email.',
        });
        router.push('/login');
      }
      if (res.error) {
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

          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
    </div>
  );
}
