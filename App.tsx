import React from 'react';
import {Provider} from 'react-native-paper';
import App from './src';
import {theme} from './src/core/theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Main = () => (
  <QueryClientProvider client={queryClient}>
    <Provider theme={theme}>
      <App />
    </Provider>
  </QueryClientProvider>
);

export default Main;
