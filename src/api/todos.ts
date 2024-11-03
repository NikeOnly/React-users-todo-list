import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, Todos } from '../types/todos.types';

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
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `todos`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'TODOLIST' }],
    }),
    editTodo: builder.mutation<Todo, { id: number, body: Todo }>({
      query: ({ id, body }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }],
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
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todosApi;