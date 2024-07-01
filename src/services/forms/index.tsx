import axios from 'axios';
import {Form} from '../../interfaces/forms.interface';
import {BACKEND_URL} from '../../../app.config';

const fetchFormsFromServerAndDownload = async (): Promise<void> => {
  try {
    const response = await axios.get<Form[]>(`${BACKEND_URL}/forms`);
    const forms = response.data;
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
    const response = await axios.get<Form[]>(`${BACKEND_URL}/forms`);
    const forms = response.data;
    return forms;
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
