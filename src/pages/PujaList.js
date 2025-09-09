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
  const [currentPage, setCurrentPage] = useState(1);

  const pujasPerPage = 15;
  const navigate = useNavigate();

  // ✅ fetch all data once, then filter and paginate on the client side
  useEffect(() => {
    const fetchPujas = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/v1/devotee/pooja/?page_size=1000");
        let pujaList = response.data?.results || [];

        // remove prasadam entries
        pujaList = pujaList.filter((puja) => {
          const checkText = `${puja.name || ""} ${puja.details || ""} ${puja.description || ""}`.toLowerCase();
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

  // ✅ Filtered pujas based on search and category
  const filteredPujas = pujas.filter((puja) => {
    const categoryFilter = selectedCategory.toLowerCase();
    const pujaCategory =
      typeof puja.category === "string"
        ? puja.category
        : puja.category?.name || "";

    const checkText = `${pujaCategory} ${puja.name || ""} ${puja.details || ""} ${puja.description || ""}`.toLowerCase();

    const matchesCategory =
      selectedCategory === "All" || checkText.includes(categoryFilter);

    const matchesSearch =
      puja.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puja.temple?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ✅ Pagination logic based on filtered data
  const totalPages = Math.ceil(filteredPujas.length / pujasPerPage);
  const indexOfLastPuja = currentPage * pujasPerPage;
  const indexOfFirstPuja = indexOfLastPuja - pujasPerPage;
  const currentPujas = filteredPujas.slice(indexOfFirstPuja, indexOfLastPuja);

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
    "Abhishek",
    "Mahamgalarti",
    "Rudrabhishek",
    "Homa",
    "Havan",
    "Anushthan",
  ];

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 6;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const getImageUrl = (puja) => {
    if (puja?.images?.length > 0 && puja.images[0].image) {
      return puja.images[0].image;
    } else if (puja?.temple?.images?.length > 0 && puja.temple.images[0].image) {
      return puja.temple.images[0].image;
    } else if (puja?.god?.image) {
      return puja.god.image;
    }
    return "https://via.placeholder.com/400x220?text=No+Image";
  };

  return (
    <div className="puja-list-container">
      <h2 className="puja-heading">Available Pujas</h2>

      <div className="category-section">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by puja or temples..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-inside" onClick={() => setSearchTerm("")}>
              ✖
            </button>
          )}
        </div>
        <button className="search-button" onClick={() => setCurrentPage(1)}>
          SEARCH
        </button>
      </div>

      <div className="puja-cards">
        {loading ? (
          [...Array(6)].map((_, index) => (
            <div className="puja-card skeleton" key={index}>
              <h3 className="skeleton-text">Loading...</h3>
            </div>
          ))
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : currentPujas.length === 0 ? (
          <p>No pujas found.</p>
        ) : (
          currentPujas.map((puja, idx) => {
            const imageUrl = getImageUrl(puja);
            const price = puja.amount || puja.original_cost || puja.cost || 0;
            return (
              <div key={puja.id || idx} className="puja-card">
                <div className="puja-image-box">
                  <img
                    src={imageUrl}
                    alt={puja.name}
                    className="puja-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x220?text=No+Image";
                    }}
                  />
                </div>
                <h3 className="puja-name">{puja.name}</h3>
                <div className="puja-info">
                  <p>🛕 {puja.temple?.name || "N/A"}</p>
                  <p>🙏 {puja.god?.name || "N/A"}</p>
                  <p>
<<<<<<< HEAD
                    ⭐{" "}
                    {truncateText(
                      puja.excluded|| "Spiritual harmony",
                      80
                    )}
=======
                    ⭐ {truncateText(puja.details || puja.description || "Spiritual harmony", 80)}
>>>>>>> ba04a15dc6690c7930b796dbbabc3f78f7832153
                  </p>
                  <p className="puja-price">
                    💰 ₹
                    {price.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="button-wrapper">
                    <button className="view-details-btn" onClick={() => navigate(`/puja/${puja.id}`)}>
                      View Details
                    </button>
                    <button className="book-button" onClick={() => handleBookNow(puja)}>
                      Participate
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1} className="page-btn">
          Prev
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`page-btn ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages} className="page-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default PujaList;

