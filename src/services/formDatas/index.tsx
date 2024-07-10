import { getFormDataToDatabaseByStatus } from "../../config/sqlite/db";
import axios from "axios";
import { Form } from "../../interfaces/forms.interface";
import { BACKEND_URL } from "../../config/app.config";

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
    const response = await getFormDataToDatabaseByStatus("ready");
    return response;
  } catch (error) {
    console.error("Error fetching forms from server:", error);
  }
};

const getFormDatasSent = async () => {
  try {
    const response = await getFormDataToDatabaseByStatus("sent");
    return response;
  } catch (error) {
    console.error("Error fetching forms from server:", error);
  }
};

const sendFormsDataToServer = async (form:any) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/submissions`,form);
    return response;
  } catch (error:any) {
    console.error("Error sending forms from server:",error.message);
  }
};

export {
  getFormDatasDraft,
  getFormDatasPreSend,
  getFormDatasSent,
  sendFormsDataToServer,
};
