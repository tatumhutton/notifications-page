import React from 'react';
import './App.css';
import Notifications from './components/Notifications';


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Notifications/>
      </header>
    </div>
  );
}

export default App;
