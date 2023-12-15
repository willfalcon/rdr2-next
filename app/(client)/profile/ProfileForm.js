import { useEffect, useState } from 'react';
import { updateUser } from './actions';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

const profileFormSchema = z.object({
  name: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default function ProfileForm({ user }) {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();
  async function onSubmit(values) {
    const name = values.name ? values.name : null;

    const password = values.password ? values.password : null;

    try {
      const res = await updateUser({ name, password, confirmPassword, user });
      if (res.success) {
        toast.success('User updated.');
        router.push('/profile');
      }
      if (res.field) {
        form.setError(res.field, { type: 'string', message: res.message });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input value={user.email} disabled />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
