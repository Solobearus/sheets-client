import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sheet from './components/Sheet/Sheet'
function App() {
  return (
    <div className="App">
      <Sheet rows={3} cols={10}></Sheet>
    </div>
  );
}

export default App;
