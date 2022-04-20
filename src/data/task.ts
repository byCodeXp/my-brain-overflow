export type TaskStatus = "active" | "closed" | "finished";

export interface TaskObject {
   id: string;
   name: string;
   time: number;
   status: TaskStatus;
}