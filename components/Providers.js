'use client';

import { Provider, useSelector } from 'react-redux';
import store, { saveState } from '@/lib/store';
import { createContext, useContext, useEffect, useState } from 'react';
import debounce from '@/lib/debounce';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { getCookie } from '@/lib/utils';
import handleSave from '@/lib/handleSave';
import { useUser } from '@/lib/useUser';

import toast from 'react-hot-toast';

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
      <AutoSave>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </AutoSave>
    </Provider>
  );
}

function AutoSave({ children }) {
  const user = useUser();
  const autoSave = useSelector(state => state.settings.autoSave);

  useEffect(() => {
    const unsubscribe =
      user && autoSave
        ? store.subscribe(
            debounce(() => {
              toast.promise(handleSave(user), {
                loading: 'Saving...',
                success: <p>Successfully saved!</p>,
                error: <p>Something went wrong</p>,
              });
            }, 5000)
          )
        : () => null;

    return () => unsubscribe();
  }, [user, autoSave]);

  return <>{children}</>;
}
