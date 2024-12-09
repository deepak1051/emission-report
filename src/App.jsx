import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmission from './components/AddEmission';
import Homepage from './components/Homepage';
import Header from './components/Header';
import { useState } from 'react';

import { mockData } from '../data';

function App() {
  const [data, setData] = useState(mockData);

  const onUpdateData = (updatedData) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
  };

  const onAddData = (data) => {
    setData((prevData) => [...prevData, data]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Homepage data={data} onUpdateData={onUpdateData} />}
        />
        <Route path="/add" element={<AddEmission onAddData={onAddData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
