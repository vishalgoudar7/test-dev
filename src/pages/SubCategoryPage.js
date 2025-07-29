// src/pages/SubCategoryPage.js
import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import "../styles/SubCategoryPage.css";
import Pagination from "../components/Pagination";

const fallbackImage = "https://placehold.co/400x300/E0E0E0/333333?text=No+Image";

const SubCategoryPage = () => {
  const { categoryId } = useParams();

  const [specialPooja, setSpecialPooja] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    page: 1,
    size: 12,
    count: 0,
    lastPage: 1,
    search: "",
    ordering: "name_en",
  });
  const [splCategory, setSplCategory] = useState("");

  const fetchSpecialPoojas = useCallback(
    async (page) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/api/v1/category/sub_category/?category=${categoryId}&page=${page}&page_size=${meta.size}`
        );
        setSpecialPooja(response.data.results);
        setMeta((prevMeta) => ({
          ...prevMeta,
          count: response.data.count,
          lastPage: Math.ceil(response.data.count / prevMeta.size),
          page: page,
        }));
        if (
          response.data.results.length > 0 &&
          response.data.results[0].category &&
          response.data.results[0].category.length > 0
        ) {
          setSplCategory(response.data.results[0].category[0]);
        } else {
          setSplCategory("");
        }
      } catch (err) {
        console.error("Failed to fetch special poojas:", err);
        setError("Failed to load special poojas. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [categoryId, meta.size]
  );

  useEffect(() => {
    if (categoryId) {
      fetchSpecialPoojas(meta.page);
    }
    window.scrollTo(0, 0);
  }, [categoryId, meta.page, fetchSpecialPoojas]);

  const onPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.lastPage) {
      setMeta((prevMeta) => ({ ...prevMeta, page: newPage }));
    }
  };

  return (
    <main className="spl-subcat-page">
      <br />
      <br />
      <h3 className="spl-subcat-title text-center">Special Puja's</h3>
      <br />
      <div className="container">
        <section>
          {loading ? (
            <div className="text-center">Loading special poojas...</div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : specialPooja.length === 0 ? (
            <div className="text-center">No special poojas found for this category.</div>
          ) : (
            <div className="row g-4">
              {specialPooja.map((item) => (
                <div key={item.id} className="col-sm-6 col-lg-4 col-xl-3">
                  <Link
                    to={`/List/category/${splCategory}/sub_category/${item.id}`}
                    className="spl-subcat-card shadow h-100"
                  >
                    <div className="position-relative">
                      <img
                        src={item.image || fallbackImage}
                        className="spl-subcat-img"
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallbackImage;
                        }}
                      />
                      <div className="card-img-overlay p-3 z-index-1"></div>
                    </div>
                    <div className="spl-subcat-content card-body">
                      <h5 className="spl-subcat-name">🙏 {item.name}</h5>
                    </div>
                    <div className="spl-subcat-footer card-footer">
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="spl-subcat-btn btn btn-primary w-100">
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              {meta.lastPage > 1 && (
                <div className="col-12">
                  <Pagination
                    currentPage={meta.page}
                    totalPages={meta.lastPage}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default SubCategoryPage;
