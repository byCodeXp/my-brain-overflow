import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { tasksReducer } from "../reducers/tasks";

export const store = configureStore({
   reducer: {
      tasksReducer
   }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;