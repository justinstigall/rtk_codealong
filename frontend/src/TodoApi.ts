import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TodoList, TodoItem } from '@bp/shared'

export const TodoApi = createApi({
    reducerPath: 'TodoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    tagTypes: ['TodoItems'],
    endpoints: (builder) => ({
        getTodoList: builder.query<TodoList, null>({
            query: () => 'todolist',
            providesTags: ['TodoItems'],
        }),
        addTodoItem: builder.mutation<null, TodoItem>({
            query: item => ({
                url: 'todoitem',
                method: 'POST',
                body: item
            }),
            invalidatesTags: ['TodoItems'],
        }),
        updateTodoItem: builder.mutation<null, TodoItem>({
            query: item => ({
                url: 'todoitem',
                method: 'PUT',
                body: item
            }),
            invalidatesTags: ['TodoItems'],
        }),
        deleteTodoItem: builder.mutation<null, TodoItem>({
            query: item => ({
                url: 'todoitem',
                method: 'DELETE',
                body: item
            }),
            invalidatesTags: ['TodoItems'],
        })
    })
})

export const { useGetTodoListQuery, useAddTodoItemMutation, useUpdateTodoItemMutation, useDeleteTodoItemMutation } = TodoApi;