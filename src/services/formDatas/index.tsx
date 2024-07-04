import { getFormDataToDatabaseByStatus } from "../../config/sqlite/db";

const getFormDatasDraft = async () => {
  try {
    const response = await getFormDataToDatabaseByStatus("draft");
    return response;
  } catch (error) {
    console.error("Error fetching forms from server:", error);
  }
};

const getFormDatasPreSend = async () => {
  try {
    const response = await getFormDataToDatabaseByStatus("draft");
    return response;
  } catch (error) {
    console.error("Error fetching forms from server:", error);
  }
};

const getFormDatasSent = async () => {
  try {
    const response = await getFormDataToDatabaseByStatus("draft");
    return response;
  } catch (error) {
    console.error("Error fetching forms from server:", error);
  }
};

export { getFormDatasDraft, getFormDatasPreSend, getFormDatasSent };
