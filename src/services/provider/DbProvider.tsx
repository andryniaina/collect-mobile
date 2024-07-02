import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { connectToDatabase } from "../../config/sqlite/db";

const DBContext = createContext<any | null>(null);

const DBProvider = ({ children }: any) => {
  const [db, setDB] = useState<any | null>(null);

  const dbConnect = async () => {
    const value = await connectToDatabase();
    console.log("db==>",value)
    setDB(value);
  };

  const loadDataSqlite = useCallback(async () => {
    try {
      await connectToDatabase();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataSqlite();
  }, [loadDataSqlite]);

  return (
    <DBContext.Provider value={{ db, dbConnect }}>
      {children}
    </DBContext.Provider>
  );
};

export const useDBContext = () => useContext(DBContext);
export default DBProvider;
