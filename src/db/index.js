import Dexie from "dexie";

const db = new Dexie("kanban");
db.version(1).stores({
  categories: "++id,title,index",
  issues: "++id,title,description,index,categoryId"
});

export default db;
