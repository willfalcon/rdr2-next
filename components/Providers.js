'use client';

import { Provider } from 'react-redux';
import store, { saveState } from '@/lib/store';
import { createContext, useContext, useEffect, useState } from 'react';
import debounce from '@/lib/debounce';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { getCookie } from '@/lib/utils';

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
      <AuthProvider>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </AuthProvider>
    </Provider>
  );
}

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

export { useAuth };

function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
