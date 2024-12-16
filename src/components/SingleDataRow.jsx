import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SingleDataRow({ row, onUpdateData }) {
  const [formData, setFormData] = useState(row);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
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

    setIsEditing(false);
    onUpdateData(formData);
    toast.success('Data updated successfully.', { position: 'top-right' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(row);
  };

  return (
    <tr className="border-t">
      <td className="px-6 py-4">
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}
