'use client';

import Title from '@/components/Title';

import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from './actions';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const resetPasswordFormSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
  confirmPassword: z.string(1, {
    message: 'Passwords must match.',
  }),
});

export default function Page({ searchParams }) {
  console.log(searchParams);
  const [user, loading, refetchUser] = useUser([], { redirectTo: '/', redirectIfFound: true });

  const form = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit({ password, confirmPassword }) {
    try {
      // check for token in search params
      const res = await resetPassword({ password, confirmPassword, token: searchParams.token });
      console.log(res);
      if (res.success) {
        toast({
          title: 'Password reset.',
        });
        router.push('/profile?refetchUser=1');
      }
      if (res.message) {
        form.setError(res.field || 'custom', { type: 'string', message: res.message });
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);

      form.setError('custom', { type: 'string', message: error.message });
    }
  }

  const { formState } = form;

  return (
    <div className="max-w-lg mx-auto">
      <Title h1 className="text-center">
        Reset Password
      </Title>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-64 mx-auto">
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
          <Button type="submit">
            {formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
          <Button asChild variant="secondary" className="ml-2">
            <Link href="/login">Log In</Link>
          </Button>
        </form>
      </Form>
    </div>
  );
}
