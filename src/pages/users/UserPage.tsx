import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { usersAPI } from '@/api/user.api';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  created_at: Date;
};

export function UserPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const columns: ColumnDef<UserType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: () => (
        <div className='flex justify-center text-lg font-bold'>Name</div>
      ),
      cell: ({ row }) => (
        <div className='flex justify-center capitalize'>
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex justify-center mx-auto text-lg font-bold'
          >
            <h1>Email</h1>
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='flex justify-center lowercase'>
          {row.getValue('email')}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.role.name,
      id: 'role.name',
      header: () => <div className='text-lg font-bold'>Role</div>,
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('role.name')}</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: () => <div className='text-lg font-bold'>Created</div>,
      cell: ({ row }) => (
        <div className='lowercase'>
          {format(new Date(row.getValue('created_at')), 'dd/MM/yyyy')}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: () => (
        <div className='flex justify-center text-lg font-bold'>Actions</div>
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-4'>
            <Link to={`/users/${row.original.id}`}>
              <Button className='bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'>
                VIEW
              </Button>
            </Link>
            <Button
              className='bg-red-400 hover:bg-red-500 hover:shadow-md'
              onClick={handleOpenModalDelete}
            >
              DELETE
            </Button>
            {isDeleteModalOpen && (
              <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='p-6 bg-white rounded-lg'>
                  <h2 className='mb-4 text-lg font-semibold'>
                    Are you sure you want to delete this tour?
                  </h2>

                  <div className='flex justify-end'>
                    <button
                      className='px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600'
                      // onClick={() => handleDeleteTour(tour.id)}
                      onClick={() => handleDeleteUser(Number(row.original.id))}
                    >
                      Confirm
                    </button>
                    <button
                      className='px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400'
                      onClick={handleCloseModalDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const handleOpenModalDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModalDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const {
    data: getDataUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.getUsers(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usersAPI.deleteUser(id),
  });

  const handleDeleteUser = async (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Delete user successfully');
        queryClient.invalidateQueries([
          'usersDelete',
        ] as InvalidateQueryFilters);
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const data = getDataUser?.results ?? [];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full p-2'>
      <div className='flex items-center py-2'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='w-4 h-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='flex justify-center w-12 h-12 mx-auto ease-linear border-4 border-t-4 border-gray-200 rounded-full loader'></div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Error loading data.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
