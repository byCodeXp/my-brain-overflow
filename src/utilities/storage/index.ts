export class StorageUtility<T> {
   private name: string;

   constructor(name: string) {
      this.name = name;
   }

   set(data: T) {
      const json = JSON.stringify(data);
      localStorage.setItem(this.name, json);
   }

   get(): T | null {
      const json = localStorage.getItem(this.name);
      if (!json) {
         return null;
      }
      const data = JSON.parse(json);
      if (!data) {
         return null;
      }
      return data;
   }
}