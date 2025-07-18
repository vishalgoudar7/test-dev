// src/pages/SplpujaDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api'; // ✅ Make sure this path is correct

const SplpujaDetails = () => {
  const { categoryId, subCategoryId } = useParams(); // ✅ Read from URL
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        console.log("➡️ Fetching Poojas for category:", categoryId, "sub_category:", subCategoryId);

        const response = await api.get('/api/v1/devotee/pooja/', {
          params: {
            category: categoryId,
            sub_category: subCategoryId,
          },
        });

        console.log("✅ API Response:", response.data);
        setPoojas(response.data.results || []);
      } catch (error) {
        console.error("❌ Error fetching poojas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subCategoryId) {
      fetchPoojas();
    }
  }, [categoryId, subCategoryId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Special Poojas</h2>
      {poojas.length === 0 ? (
        <p>No poojas available for this category/sub-category.</p>
      ) : (
        <ul className="space-y-4">
          {poojas.map((pooja) => (
            <li key={pooja.id} className="p-4 border rounded shadow flex gap-4">
              {/* Left: Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={pooja.images?.[0]?.image || 'https://via.placeholder.com/150'}
                  alt={pooja.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Right: Text */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{pooja.name}</h3>
                <p className="text-sm text-gray-700">{pooja.details}</p>
                <p className="text-green-600 font-bold mt-2">₹ {pooja.original_cost}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default SplpujaDetails;
