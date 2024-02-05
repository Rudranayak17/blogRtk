import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/userReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { myApi } from "./actions/Api";


const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), myApi.middleware],
});

export default store; // Add this comment
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);