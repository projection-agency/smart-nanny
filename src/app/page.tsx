import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/ua');
  return null;
} 