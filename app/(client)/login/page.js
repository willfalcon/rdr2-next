'use client';

import Title from '@/components/Title';

import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from './actions';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .email('Please enter a valid email address'),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export default function Page() {
  const [user, loading, refetchUser] = useUser([], { redirectTo: '/', redirectIfFound: true });

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values) {
    const email = values.email.toLowerCase();
    const password = values.password;

    try {
      const res = await login({ email, password });

      if (res.success) {
        router.push('/?refetchUser=1');
      }
      if (res.message) {
        form.setError(res.field || 'custom', { type: 'string', message: res.message });
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);

      form.setError('custom', { type: 'string', message: error.message });
    }
  }

  return (
    <div className="w-64 max-w-lg mx-auto">
      <Title h1 className="text-center">
        Login
      </Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
              <FormItem className="mt-8">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/forgot-password" className="block text-sm font-medium text-muted-foreground my-4">
            Forgot Password
          </Link>
          <Button type="submit">Login</Button>
          <Button asChild variant="secondary" className="ml-2">
            <Link href="/signup"> Sign Up</Link>
          </Button>
        </form>
      </Form>
    </div>
  );
}
