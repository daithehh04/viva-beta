"use client"
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataB, setDataB] = useState('');
  const [isInitPage, setIsInitPage] = useState(false);

  return (
    <DataContext.Provider value={{ dataB, setDataB, isInitPage, setIsInitPage }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
