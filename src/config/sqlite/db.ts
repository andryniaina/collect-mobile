import * as SQLite from "expo-sqlite";

let db: any;
export const connectToDatabase = async () => {
  console.log("Loggin to db");
  db = await SQLite.openDatabaseAsync("cDb");
  await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS Forms (_id TEXT PRIMARY KEY, version TEXT, name TEXT, fields TEXT, createdAt TEXT, updatedAt TEXT);
CREATE TABLE IF NOT EXISTS FormDatas (_id TEXT PRIMARY KEY,formId TEXT,version TEXT, name TEXT,fields TEXT, createdAt TEXT, updatedAt TEXT,status TEXT);
CREATE TABLE IF NOT EXISTS Users (_id TEXT PRIMARY KEY, username TEXT, password TEXT, token TEXT);
`);
};

export const insertFormToDatabase = async (form: any) => {
  const _id = form._id;
  const version = form.version;
  const name = form.name;
  const fields = JSON.stringify(form.fields);
  const createdAt = form.createdAt;
  const updatedAt = form.updatedAt;
  const result = await db.runAsync(`
    INSERT OR REPLACE INTO Forms (_id, version, name, fields, createdAt, updatedAt) VALUES ('${_id}','${version}','${name}','${fields}','${createdAt}','${updatedAt}')
  `);
  return result;
};

export const getAllFormToDatabase = async () => {
  const allRows = await db.getAllAsync("SELECT * FROM Forms");
  const allRowsParsed = allRows.map((row: any) => {
    return {
      ...row,
      fields: JSON.parse(row.fields),
    };
  });
  return allRowsParsed;
};

export const insertFormDataToDatabase = async (form: any) => {
  const _id = form._id;
  const formId = form.formId;
  const version = form.version;
  const name = form.name;
  const fields = JSON.stringify(form.fields);
  const createdAt = form.createdAt;
  const updatedAt = form.updatedAt;
  const status = form.status;
  await db.runAsync(`
    INSERT OR REPLACE INTO FormDatas (_id, formId, version, name ,fields, createdAt, updatedAt,status) VALUES ('${_id}','${formId}','${version}','${name}','${fields}','${createdAt}','${updatedAt}','${status}')
  `);
  return _id;
};

export const getFormDataToDatabaseByStatus = async (status: String) => {
  const allRows = await db.getAllAsync(
    `SELECT * FROM FormDatas WHERE status='${status}'`
  );
  const allRowsParsed = allRows.map((row: any) => {
    return {
      ...row,
      fields: JSON.parse(row.fields),
    };
  });
  return allRowsParsed;
};

export const insertUserToDatabase = async (user: any) => {
  const _id = user._id;
  const username = user.username;
  const password = user.password;
  const token = JSON.stringify(user.token);
  const result = await db.runAsync(`
    INSERT OR REPLACE INTO Users (_id, username, password, token) VALUES ('${_id}','${username}','${password}','${token}')
  `);
  return result;
};

export const loginUserFromDatabase = async (user: any) => {
  const username = user.username;
  const password = user.password;
  const allRows = await db.getAllAsync(
    `SELECT * FROM Users WHERE username='${username}' AND password='${password}'`
  );
  return allRows;
};
