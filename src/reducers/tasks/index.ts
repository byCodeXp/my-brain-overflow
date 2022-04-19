import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskDto } from "../../data/task";

interface State {
   tasks: Array<TaskDto>;
}

const initialState: State = {
   tasks: []
};

const slice = createSlice({
   name: "TASKS_SLICE",
   initialState,
   reducers: {
      setTasks(state, { payload: tasks }: PayloadAction<Array<TaskDto>>) {
         state.tasks = tasks;
      },
      addTask(state, { payload: task } : PayloadAction<TaskDto>) {
         state.tasks = [task, ...state.tasks];
      }
   }
});

export const { reducer: tasksReducer, actions } = slice;