import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { authApi } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppContext, AppContextType } from '@/contexts/app.context';
import LoginWithGoogle from '@/pages/auth/LoginWithGoogle';
import { Account } from '@/redux/authSaga';
import { FormSchemaLogin } from '@/utils/schema';
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/utils/storage';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';

export function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext<AppContextType>(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: Account) => authApi.login(data),
  });

  const onSubmit = async (data: Account) => {
    setIsLoading(true);
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setAccessTokenToLS(data.access);
        setRefreshTokenToLS(data.refresh);
        setIsAuthenticated(true);
        navigate('/');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-10 space-y-6 border rounded w-[30rem] shadow-md'
        >
          <h1 className='flex justify-center text-3xl font-bold'>Login</h1>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoginWithGoogle />
          <Button type='submit' className='flex ml-auto' loading={isLoading}>
            Submit
          </Button>
          <p className='font-medium'>
            Don’t have an account yet?{' '}
            <Link
              to='/register'
              className='text-blue-600 underline cursor-pointer'
            >
              Create account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
