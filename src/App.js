import React from 'react';
import './App.css';
import Tabble from './pages/Tabble';
import TabbleProvider from './context/TabbleProvider';

function App() {
  return (
    <TabbleProvider>
      <Tabble />
    </TabbleProvider>
  );
}

export default App;
