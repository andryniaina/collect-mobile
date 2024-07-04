import {useQuery} from '@tanstack/react-query';
import {getFormDatasDraft} from './index';

const useLocalFormDatas = () => {
  return useQuery({
    queryKey: ['localFormDatas'],
    queryFn: getFormDatasDraft,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export {useLocalFormDatas};
