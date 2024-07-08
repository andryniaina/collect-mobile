import {useQuery} from '@tanstack/react-query';
import {getFormDatasDraft,getFormDatasPreSend,getFormDatasSent} from './index';

const useLocalFormDatas = () => {
  return useQuery({
    queryKey: ['localFormDatas'],
    queryFn: getFormDatasDraft,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
const useLocalFormReadyDatas = () => {
  return useQuery({
    queryKey: ['localFormReadyDatas'],
    queryFn: getFormDatasPreSend,
  });
};
const useLocalFormSentDatas = () => {
  return useQuery({
    queryKey: ['localFormSentDatas'],
    queryFn: getFormDatasSent,
  });
};
export {useLocalFormDatas,useLocalFormReadyDatas,useLocalFormSentDatas};
