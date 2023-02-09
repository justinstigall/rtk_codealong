import { configureStore } from '@reduxjs/toolkit'
import { TodoApi } from './TodoApi'

export const store = configureStore({
    reducer: {
        [TodoApi.reducerPath]: TodoApi.reducer,
    },
    middleware: (getdm) =>
        getdm().concat(TodoApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch