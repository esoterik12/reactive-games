import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import RegisterForm from '../components/auth/RegisterForm';

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <RegisterForm />;
}
