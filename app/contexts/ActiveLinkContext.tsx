'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveLinkContextType {
  activePath: string;
  setActivePath: (path: string) => void;
}

const ActiveLinkContext = createContext<ActiveLinkContextType | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: { children: ReactNode }) => {
  const [activePath, setActivePath] = useState<string>('');

  return (
    <ActiveLinkContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);
  if (context === undefined) {
    throw new Error('useActiveLink must be used within an ActiveLinkProvider');
  }
  return context;
};
