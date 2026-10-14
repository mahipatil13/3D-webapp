import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { AppContent } from './AppContent';

export const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
};

export default App;
