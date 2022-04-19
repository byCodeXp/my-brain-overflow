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
      },
      changeTask(state, { payload: task }: PayloadAction<TaskDto>) {
         const tasks = state.tasks;
         const index = tasks.findIndex(t => t.id === task.id);
         if (index !== -1) {
            state.tasks = [...tasks.slice(0, index), task, ...tasks.slice(index + 1)];
         }
      }
   }
});

export const { reducer: tasksReducer, actions: tasksActions } = slice;