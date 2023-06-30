// @ts-nocheck

import {
  ActionArgs,
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { signup, login } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: ActionArgs) {
  //* Example of extracting search parameters in back end code
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: authStyles,
    },
  ];
};

export const meta: MetaFunction = () => ({
  title: 'Login | Signup',
  description: 'Login or register.',
});

export const headers: HeadersFunction = ({ parentHeaders }) => ({
  'Cache-Control': parentHeaders.get('Cache-Control'), // 60 minutes
});
