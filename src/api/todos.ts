import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todos } from '../types/todos.types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todos, void>({
      query: () => `todos`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
              { type: 'Todo', id: 'TODOLIST' },
            ]
          : [{ type: 'Todo', id: 'TODOLIST' }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
        query(id) {
          return {
            url: `todos/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (result, error, id) => [{ type: 'Todo', id }],
      }),
  }),
});

export const {
  useGetTodosQuery,
  useDeleteTodoMutation,
} = todosApi;