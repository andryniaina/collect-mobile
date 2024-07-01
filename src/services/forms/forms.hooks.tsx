import {useQuery} from '@tanstack/react-query';
import {getFormsFromDatabase, fetchFormsFromServer} from './index';

const useLocalForms = () => {
  return useQuery({
    queryKey: ['localForms'],
    queryFn: getFormsFromDatabase,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const useServerForms = () => {
  return useQuery({queryKey: ['serverForms'], queryFn: fetchFormsFromServer});
};

export {useLocalForms, useServerForms};
