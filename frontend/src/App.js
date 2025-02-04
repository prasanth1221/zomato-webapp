import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurants from './components/Restaurants';
import RestaurantDetails from './components/RestaurentDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
