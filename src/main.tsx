import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
   <QueryClientProvider client={queryClient}>
   {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <PrimeReactProvider>
        <App />
   </PrimeReactProvider>
   {/* <ReactQueryDevtools initialIsOpen={false} /> */}

   </QueryClientProvider>
 </React.StrictMode>,
)
