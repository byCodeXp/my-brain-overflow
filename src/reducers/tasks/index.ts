import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskObject } from "../../data/task";

interface State {
   tasks: Array<TaskObject>;
}

const initialState: State = {
   tasks: []
};

const slice = createSlice({
   name: "TASKS_SLICE",
   initialState,
   reducers: {
      setTasks(state, { payload: tasks }: PayloadAction<Array<TaskObject>>) {
         state.tasks = tasks;
      },
      addTask(state, { payload: task } : PayloadAction<TaskObject>) {
         state.tasks = [task, ...state.tasks];
      }
   }
});

export const { reducer: tasksReducer, actions } = slice;