'use server';
import { authClient } from '@/sanity/authClient';
import { groq } from 'next-sanity';

export async function deleteUsers() {
  const result = await authClient.delete({ query: groq`*[_type == "user" && email != "willkhawks@gmail.com"]` });
  return result;
}
