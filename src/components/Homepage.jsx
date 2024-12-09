import { useState } from 'react';

const Homepage = ({ data: dummyData }) => {
  const [data, setData] = useState(dummyData);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    scope: '',
    emission: '',
    date: '',
  });

  const handleEditClick = (row) => {
    setEditRowId(row.id);
    setFormData(row);
  };

  const handleSaveClick = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === editRowId ? { ...item, ...formData } : item
      )
    );
    setEditRowId(null);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setFormData({ description: '', scope: '', emission: '', date: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto mt-10 px-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Emission Data Table
      </h1>

      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Description
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Scope
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Emission (kg CO2-e)
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="px-6 py-4">
                {editRowId === row.id ? (
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  row.description
                )}
              </td>
              <td className="px-6 py-4">
                {editRowId === row.id ? (
                  <select
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Scope 1">Scope 1</option>
                    <option value="Scope 2">Scope 2</option>
                    <option value="Scope 3">Scope 3</option>
                  </select>
                ) : (
                  row.scope
                )}
              </td>
              <td className="px-6 py-4">
                {editRowId === row.id ? (
                  <input
                    type="number"
                    name="emission"
                    value={formData.emission}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  row.emission
                )}
              </td>
              <td className="px-6 py-4">
                {editRowId === row.id ? (
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  row.date
                )}
              </td>
              <td className="px-6 py-4">
                {editRowId === row.id ? (
                  <div className="space-x-2">
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(row)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
