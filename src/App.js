import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sheet from './components/Sheet/Sheet'
function App() {
  return (
    <div className="App">
      <Sheet rows={20} cols={3}></Sheet>
    </div>
  );
}

export default App;
  