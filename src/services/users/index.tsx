import axios from "axios";
import { BACKEND_URL } from "../../config/app.config";

const login = async (user: any) => {
  try {
    console.log(BACKEND_URL);
    const response = await axios.post(`${BACKEND_URL}/auth/login`, user);
    return response;
  } catch (error) {
    console.error("Error login from server:", error);
  }
};
const getUserByPhone = async (phoneNumber: any) => {
  try {
    console.log(`${BACKEND_URL}/users/phoneNumber/${phoneNumber}`);
    const response = await axios.get(`${BACKEND_URL}/users/phoneNumber/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching User from server:", error);
  }
};

const updateUser = async (user:any,token:any)=>{
  try{
  console.log(`${BACKEND_URL}/users/update/${user.id}`);
    const response = await axios.patch(`${BACKEND_URL}/users/update/${user.id}`,user,{headers: { Authorization: `Bearer ${token}` }});
    return response.data;
  } catch (error) {
    console.error("Error fetching User from server:", error);
  }
}
const formatPassword = async (id:string)=>{
  try{
  console.log(`${BACKEND_URL}/users/formatPassword/${id}`);
    const response = await axios.patch(`${BACKEND_URL}/users/formatPassword/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching User from server:", error);
  }
}

export { login,getUserByPhone,updateUser,formatPassword};
