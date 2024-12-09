import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddEmission = ({ onAddData }) => {
  const [formData, setFormData] = useState({
    description: '',
    scope: 'Scope 1',
    emission: '',
    date: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);

    if (
      !formData.description ||
      !formData.scope ||
      !formData.emission ||
      !formData.date
    ) {
      toast.error('Please fill in all fields.', {
        position: 'top-right',
      });
      return;
    }

    onAddData({ ...formData, id: uuidv4() });
    navigate('/');
    toast.success('Data added successfully.', {
      position: 'top-right',
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mt-10">
      <h2 className="text-xl font-bold mb-4">Add Emission Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
          />
        </div>

        {/* Scope */}
        <div>
          <label
            htmlFor="scope"
            className="block text-sm font-medium text-gray-700 "
          >
            Scope
          </label>
          <select
            id="scope"
            name="scope"
            value={formData.scope}
            onChange={handleChange}
            className=" p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="Scope 1">Scope 1</option>
            <option value="Scope 2">Scope 2</option>
            <option value="Scope 3">Scope 3</option>
          </select>
        </div>

        {/* Emission */}
        <div>
          <label
            htmlFor="emission"
            className="block text-sm font-medium text-gray-700"
          >
            Emission (kg CO2-e)
          </label>
          <input
            type="number"
            id="emission"
            name="emission"
            value={formData.emission}
            onChange={handleChange}
            className=" p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className=" p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmission;
