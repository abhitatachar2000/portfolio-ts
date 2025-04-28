import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import Index from './Pages/Index';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <div id="main-page" className="container">
          <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Index />} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}
export default App
