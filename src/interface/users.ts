export interface IUser {
  id: number;
  name: string;
  email: string;
  role: {
    id?: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

interface DataType {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DataType[];
}
