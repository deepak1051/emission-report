import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmission from './components/AddEmission';
import Homepage from './components/Homepage';
import Header from './components/Header';
import { useState } from 'react';

const dummyData = [
  {
    id: 1,
    description: 'Transport emissions',
    scope: 'Scope 1',
    emission: 150,
    date: '2024-12-01',
  },
  {
    id: 2,
    description: 'Electricity usage',
    scope: 'Scope 2',
    emission: 300,
    date: '2024-12-05',
  },
  {
    id: 3,
    description: 'Supplier emissions',
    scope: 'Scope 3',
    emission: 500,
    date: '2024-12-09',
  },
];

function App() {
  const [data, setData] = useState(dummyData);

  const onAddData = (data) => {
    setData((prevData) => [...prevData, data]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage data={data} />} />
        <Route path="/add" element={<AddEmission onAddData={onAddData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
