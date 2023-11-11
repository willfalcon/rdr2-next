'use client';

import { Provider } from 'react-redux';
import store, { saveState } from '@/lib/store';
import { useEffect } from 'react';
import debounce from '@/lib/debounce';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function Providers({ children, ...props }) {
  useEffect(() => {
    const unsubscribe = store.subscribe(
      // we use debounce to save the state once each 800ms
      // for better performances in case multiple changes occur in a short time
      debounce(() => {
        saveState(store.getState());
      }, 800)
    );

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </Provider>
  );
}
