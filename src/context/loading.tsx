import React, { createContext, useState, useContext, useCallback } from 'react';

import Loading from '../components/Loading';

interface LoadingContextData {
  isVisible: boolean;
  handleVisible(state: boolean): void;
}

export const LoadingContext = createContext({} as LoadingContextData);

export const LoadingProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = useCallback(state => {
    setIsVisible(state);
  }, []);

  return (
    <LoadingContext.Provider value={{ isVisible, handleVisible }}>
      {children}

      {isVisible && <Loading />}
    </LoadingContext.Provider>
  );
};

export function useLoading() {
  const context = useContext(LoadingContext);

  return context;
}
