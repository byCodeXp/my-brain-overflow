export interface TaskDto {
   id: string;
   name: string;
   time: number;
   status: "active" | "closed" | "finished";
}