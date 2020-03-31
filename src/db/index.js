import Dexie from "dexie";

const db = new Dexie("kanban");
db.version(1).stores({
  categories: "++id,title,index,boardId",
  issues: "++id,title,description,index,categoryId",
  boards: "++id,title,color"
});

export default db;
