'use client';

import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/fetcher';

interface SwrProviderProps {
  children: React.ReactNode;
}

export function SwrProvider({ children }: SwrProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        onError: (error, key) => {
          if (error.status === 404) {
            console.error(`Resource not found: ${key}`);
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}