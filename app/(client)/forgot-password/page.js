'use client';

import Title from '@/components/Title';

import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendResetEmail } from './actions';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .email('Please enter a valid email address'),
});

export default function Page() {
  const [user, loading, refetchUser] = useUser([], { redirectTo: '/', redirectIfFound: true });

  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { formState } = form;

  async function onSubmit(values) {
    const email = values.email.toLowerCase();

    try {
      const res = await sendResetEmail(email);
      if (res && res.message) {
        form.setError(res.field || 'custom', { type: 'string', message: res.message });
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);

      form.setError('custom', { type: 'string', message: error.message });
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <Title h1 className="text-center">
        Forgot Password
      </Title>
      <p>Enter your email. We'll send you a link to reset your password.</p>
      {formState.isSubmitSuccessful ? (
        <>
          <Separator className="my-4" />
          <h2 className="text-lg text-green-600 font-bold">Success!</h2>
          <p className="">Check your email for a link to reset your password.</p>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-64 mx-auto">
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
            <Button type="submit">
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Email'
              )}
            </Button>
            <Button asChild variant="secondary" className="ml-2">
              <Link href="/login">Log In</Link>
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
