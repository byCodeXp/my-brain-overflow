export type TaskStatus = "active" | "closed" | "finished";

export interface TaskDto {
   id: string;
   name: string;
   time: number;
   status: TaskStatus;
}