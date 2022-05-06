import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from ".";
import { TaskObject } from "../../data/task";
import { AppDispatch, store } from "../../store";
import { StorageUtility } from "../../utilities/storage";

const storage = new StorageUtility<TaskObject[]>("YOUR_MIND_STORAGE");

const state = () => store.getState();

const setTasks = (tasks: Array<TaskObject>) => {
   return (dispatch: AppDispatch) => {
      if (tasks && tasks.length > 0) {
         dispatch(actions.setTasks(tasks));
      }
   };
};

const addTask = (task: TaskObject) => {
   return (dispatch: AppDispatch) => {
      const tasks = state().tasksReducer.tasks;
      if (tasks && tasks.length > 0) {
         storage.set([task, ...tasks]);
      }
      dispatch(actions.addTask(task));
   };
};

const changeTask = (task: TaskObject) => {
   return (dispatch: AppDispatch) => {
      const tasks = state().tasksReducer.tasks;
      const index = tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
         const prepare = [...tasks.slice(0, index), task, ...tasks.slice(index + 1)];
         storage.set(prepare);
         dispatch(setTasks(prepare));
      }
   };
};

export const TasksActions = bindActionCreators({
   addTask,
   setTasks,
   changeTask,
}, store.dispatch);