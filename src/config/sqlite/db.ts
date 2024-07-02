import * as SQLite from "expo-sqlite";

let db : any;
export const connectToDatabase = async () => {
  console.log("Loggin to db")
  db = await SQLite.openDatabaseAsync("collectDatabasev3");
  await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS Forms (_id TEXT PRIMARY KEY, version TEXT, name TEXT, fields TEXT, createdAt TEXT, updatedAt TEXT)
`);
};


export const insertFormToDatabase = async (form:any) =>{
  const _id=form._id;
  const version=form.version;
  const name = form.name;
  const fields = JSON.stringify(form.fields);
  const createdAt = form.createdAt;
  const updatedAt = form.updatedAt;
    const result = await db.runAsync(`
    INSERT OR REPLACE INTO Forms (_id, version, name, fields, createdAt, updatedAt) VALUES ('${_id}','${version}','${name}','${fields}','${createdAt}','${updatedAt}')
  `);
  return result;
};

export const getAllFormToDatabase = async () =>{
  const allRows = await db.getAllAsync('SELECT * FROM Forms');
  const allRowsParsed = allRows.map((row:any) => {
    return {
      ...row,
      fields: JSON.parse(row.fields)
    };
  });
  return allRowsParsed;
};
