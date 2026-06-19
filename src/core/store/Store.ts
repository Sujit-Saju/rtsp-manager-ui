import { configureStore } from "@reduxjs/toolkit";
import StreamReducer from "./reducer/StreamReducer";
import { toastMiddleware } from "./ToastMiddleware";

export const store = configureStore({
  reducer: {
    stream: StreamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(toastMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
