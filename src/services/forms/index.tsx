import axios from 'axios';
import {Form} from '../../interfaces/forms.interface';
import {BACKEND_URL} from '../../../app.config';
import { connectToDatabase,insertFormToDatabase,getAllFormToDatabase } from '../../config/sqlite/db';
import { useDBContext } from '../provider/DbProvider';



const fetchFormsFromServerAndDownload = async (): Promise<void> => {
  try {
    const response = await axios.get<Form[]>(`${BACKEND_URL}/forms`);
    const forms = response.data;
    forms.map(async (form)=>{
      await insertFormToDatabase(form);
    })
    console.log('Forms stored in database');
  } catch (error) {
    console.error('Error fetching forms from server:', error);
  }
};

const fetchFormsFromServer = async (): Promise<void> => {
  try {
    const response = await axios.get<Form[]>(`${BACKEND_URL}/forms`);
    const forms = response.data;

    console.log('Forms: ', forms);
  } catch (error) {
    console.error('Error fetching forms from server:', error);
  }
};

const getFormsFromDatabase = async (): Promise<Form[]> => {
  try {
    console.log("Get from base")
    const responses = await getAllFormToDatabase();
    return responses;
  } catch (error) {
    console.error('Error fetching forms from database:', error);
    return [];
  }
};

export {
  fetchFormsFromServer,
  getFormsFromDatabase,
  fetchFormsFromServerAndDownload,
};
