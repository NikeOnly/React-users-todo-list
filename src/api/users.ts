import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Users } from '../types/user.types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'USERLIST' },
            ]
          : [{ type: 'User', id: 'USERLIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
} = usersApi;