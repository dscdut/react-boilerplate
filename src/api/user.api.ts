import axiosClient from '@/api/axiosClient';
import { IUser } from '@/interface/users';

export const usersAPI = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsers(): Promise<any> {
    const url = `/users`;
    return axiosClient.get(url);
  },
  getUserDetails(id: number): Promise<IUser> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  putUser(id: number, user: IUser): Promise<IUser> {
    const url = `/users/${id}`;
    return axiosClient.put(url, user);
  },
  deleteUser(id: number): Promise<IUser> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};
