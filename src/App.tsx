import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RenderEmails from "./components/RenderEmeils";

function App() {
  return (
    <div className="max-w-7xl py-8 border-0 mx-auto bg-white">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<RenderEmails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
