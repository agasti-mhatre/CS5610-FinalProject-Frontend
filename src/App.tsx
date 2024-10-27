import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={ <Home /> }></Route>
          <Route path="/Profile" element={ <Profile/> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;