// src/pages/SpecialPooja.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/SpecialPooja.css";

const fallbackImage = "/assets/images/placeholder.png"; // Ensure this path is correct

const SpecialPooja = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialCategories();
  }, []);

  const fetchInitialCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/v1/category/category/");
      const allCategories = res.data.results;
      const firstFive = allCategories.slice(0, 5); // Taking only the first 5 categories
      setCategoryList(firstFive);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load special pooja categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <main className="special-pooja-main">
      <div className="text-center">
        <h2 className="section-title-special-pooja">✨ SPECIAL PUJA'S ✨</h2>
        <p className="section-subtitle">
          Experience the magic of a special puja, an enchanting ritual that
          elevates the spirit and brings blessings into your life.
        </p>
      </div>

      <div className="container mt-4">
        {loading ? (
          <div className="text-center">Loading categories...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : categoryList.length === 0 ? (
          <div className="text-center">No special pooja categories available.</div>
        ) : (
          <div className="row justify-content-center">
            {categoryList.map((category) => (
              <div
                key={category.id}
                className="col-6 col-md-4 col-lg-2 mb-4 text-center"
                onClick={() => handleCategoryClick(category.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="special-pooja-card-wrapper">
                  <img
                    src={category.image || fallbackImage}
                    alt={category.name}
                    className="special-pooja-card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />
                  <h6 className="special-pooja-card-name">{category.name}</h6>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SpecialPooja;
