import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { FormSchemaRegister } from '@/utils/schema';
import { useState } from 'react';
import { Account } from '@/redux/authSaga';
import { authApi } from '@/api/auth.api';
import { useMutation } from '@tanstack/react-query';

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 1,
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: Account) => authApi.register(data),
  });

  const onSubmit = async (data: Account) => {
    setIsLoading(true);
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Registration account successful!');
        navigate('/login');
      },
      onError: () => {
        toast.error('An error occurred. Please try again.');
      },
    });
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-10 space-y-6 border rounded shadow-md w-96'
        >
          <h1 className='flex justify-center text-3xl font-bold'>Register</h1>
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
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder='Role' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='flex ml-auto' loading={isLoading}>
            Submit
          </Button>

          <p className='font-medium'>
            Do you already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-600 underline cursor-pointer'
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
