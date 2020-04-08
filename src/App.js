import React from 'react';
import './App.css';
import Quote from './components/Quote';
import ReactFCCtest from 'react-fcctest';
function App() {
  return (
    <div className="App">
      
      <ReactFCCtest />
      <h3>Random Quote Machine</h3>
      <Quote />
      </div>
  );
}

export default App;
