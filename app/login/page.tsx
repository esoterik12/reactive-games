import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from '../components/auth/LoginForm';

export default async function LoginPage() {
  // redirects if there is a session
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <LoginForm />;
}
