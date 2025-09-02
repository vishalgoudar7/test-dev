

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/PujaList.css";

const PujaList = () => {
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const response = await api.get("/api/v1/devotee/pooja/");
        let pujaList = response.data?.results || [];

        // ✅ Exclude only pujas that contain word "prasadam"
        pujaList = pujaList.filter((puja) => {
          const checkText =
            `${puja.name || ""} ${puja.details || ""} ${puja.description || ""}`.toLowerCase();
          return !checkText.includes("prasadam");
        });

        setPujas(pujaList);
      } catch (err) {
        console.error("Failed to load pujas:", err);
        setError("Failed to load pujas");
      } finally {
        setLoading(false);
      }
    };

    fetchPujas();
  }, []);

  const handleBookNow = (puja) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyExists = cart.find((item) => item.id === puja.id);

    if (!alreadyExists) {
      const item = {
        id: puja.id,
        name: puja.name,
        description: puja.details || puja.description || "",
        cost: puja.amount || puja.original_cost || puja.cost || 0,
        images: puja.images,
        quantity: 1,
        final_total: puja.amount || puja.original_cost || puja.cost || 0,
      };
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    }

    navigate("/cart");
  };

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const categories = [
    "All",
    "Abhisheka",
    "Mahamangalarati",
    "Rudrabhishek",
    "Home",
    "Havan",
    "Anushthan",
  ];

  const filteredPujas = pujas
    .filter((puja) => {
      if (selectedCategory === "All") return true;
      return puja.category?.toLowerCase() === selectedCategory.toLowerCase();
    })
    .filter((puja) =>
      puja.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="puja-list-container">
      <h2 className="puja-heading">Available Pujas</h2>

      <div className="category-section">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pujas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">SEARCH</button>
      </div>

      <div className="puja-cards">
        {loading ? (
          [...Array(6)].map((_, index) => (
            <div className="puja-card skeleton" key={index}>
              <h3 className="skeleton-text">Loading...</h3>
            </div>
          ))
        ) : filteredPujas.length === 0 ? (
          <p>No pujas found.</p>
        ) : (
          filteredPujas.map((puja, idx) => {
            const rawImage =
              puja?.images?.length > 0 ? puja.images[0]?.image : null;
            const imageUrl =
              rawImage ||
              "https://via.placeholder.com/360x180?text=No+Image";
            const price =
              puja.amount || puja.original_cost || puja.cost || 0;

            return (
              <div key={puja.id || idx} className="puja-card">
                <div className="puja-image-box">
                  <img
                    src={imageUrl}
                    alt={puja.name}
                    className="puja-image"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/360x180?text=No+Image";
                    }}
                  />
                </div>
                <div className="puja-info">
                  <h3 className="puja-name">{truncateText(puja.name, 20)}</h3>
                  <p>
                    <strong>Temple:</strong> {puja.temple?.name || "N/A"}
                  </p>
                  <p>
                    <strong>God:</strong> {puja.god?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Benefits:</strong>{" "}
                    {truncateText(
                      puja.excluded|| "Spiritual harmony",
                      80
                    )}
                  </p>
                  <p className="puja-price">
                    <strong>Price:</strong> ₹
                    {price.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="button-wrapper">
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/puja/${puja.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="book-button"
                      onClick={() => handleBookNow(puja)}
                    >
                      Participate
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PujaList;
