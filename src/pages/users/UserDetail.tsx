import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usersAPI } from '@/api/user.api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkeletonView } from '@/components/skeleton';

export default function UserDetail() {
  const { id } = useParams();

  const {
    data: getUserDetail,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['usersDetails', id],
    queryFn: () => usersAPI.getUserDetails(id as unknown as number),
  });
  console.log('getUserDetail:', getUserDetail?.id);
  const [name, setName] = useState(getUserDetail?.name || '');
  const [email, setEmail] = useState(getUserDetail?.email || '');
  const [role, setRole] = useState(getUserDetail?.role.name || '');
  const [createdAt, setCreatedAt] = useState<string | undefined>(
    getUserDetail?.created_at || ''
  );

  useEffect(() => {
    if (isSuccess && getUserDetail) {
      setName(getUserDetail.name);
      setEmail(getUserDetail.email);
      setRole(getUserDetail.role.name);
      setCreatedAt(getUserDetail.created_at);
    }
  }, [isSuccess, getUserDetail]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${id}/`,
        {
          name,
          email,
          role: { name: role },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success('User updated successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-center w-full p-6 mx-auto'>
      <h1 className='flex justify-center mx-auto text-3xl'>Users Details</h1>
      <form
        action=''
        className='flex flex-col justify-center gap-4 mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='space-y-2'>
          <label htmlFor='name' className='text-xl font-bold'>
            Name
          </label>
          {name ? (
            <Input
              id='name'
              placeholder='Name here ...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='outline-none lg:w-96'
            />
          ) : (
            <SkeletonView />
          )}
        </div>
        <div className='space-y-2'>
          <label htmlFor='email' className='text-xl font-bold'>
            Email
          </label>
          {email ? (
            <Input
              id='email'
              placeholder='Email here ...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='outline-none lg:w-96'
            />
          ) : (
            <SkeletonView />
          )}
        </div>
        <div className='space-y-2'>
          <label htmlFor='role' className='text-xl font-bold'>
            Role
          </label>
          {role ? (
            <Input
              id='role'
              placeholder='Role here ...'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='outline-none lg:w-96'
            />
          ) : (
            <SkeletonView />
          )}
        </div>
        <div className='space-y-2'>
          <label htmlFor='created_at' className='text-xl font-bold'>
            Created At
          </label>
          {createdAt ? (
            <Input
              id='created_at'
              placeholder='Created here ...'
              value={createdAt}
              disabled
              className='outline-none lg:w-96'
            />
          ) : (
            <SkeletonView />
          )}
        </div>
        <Button
          className='flex justify-center w-40 mx-auto bg-blue-400 shadow-md hover:bg-blue-500'
          type='submit'
        >
          Update
        </Button>
      </form>
    </div>
  );
}
