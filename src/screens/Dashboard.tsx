import React, {memo, useCallback, useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import {Navigation} from '../types';
import {fetchFormsFromServerAndDownload} from '../services/forms';
import {useQueryClient} from '@tanstack/react-query';
import { connectToDatabase } from '../config/sqlite/db';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const fetchForms = async () => {
    setIsLoading(true);
    await fetchFormsFromServerAndDownload();
    queryClient.invalidateQueries({queryKey: ['localForms']}); // Invalidate the cache
    setIsLoading(false);
  };

  return (
    <Background>
      <Logo />
      <Header>Let’ start</Header>
      <Button mode="outlined" onPress={() => navigation.navigate('BlankForms')}>
        Fill forms
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
        Send forms data
      </Button>
      <Button mode="outlined" loading={isLoading} onPress={fetchForms}>
        Download forms
      </Button>
    </Background>
  );
};

export default memo(Dashboard);
