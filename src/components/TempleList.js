

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTemples, setSearch } from '../redux/templeSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/TempleList.css';

const SkeletonCard = () => (
  <div className="temple-card skeleton">
    <div className="skeleton-img" />
    <div className="skeleton-text title" />
    <div className="skeleton-text location" />
    <div className="skeleton-button" />
  </div>
);

const TempleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    temples = [],
    loading = false,
    error = '',
    search = ''
  } = useSelector((state) => state.temple || {});

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchTemples());
  }, [dispatch]);

  const filteredTemples = temples.filter((temple) =>
    temple.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTemples.length / pageSize);
  const paginated = filteredTemples.slice((page - 1) * pageSize, page * pageSize);

  const handlePageClick = (number) => setPage(number);
  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  const getImageUrl = (temple) => {
    const BASE_URL = 'https://beta.devalayas.com';
    if (temple.image_url && temple.image_url !== 'null') {
      return temple.image_url.startsWith('http') ? temple.image_url : `${BASE_URL}${temple.image_url}`;
    }
    if (temple.images && temple.images.length > 0) {
      const img = temple.images[0]?.url || temple.images[0]?.image;
      return img && img !== 'null' ? (img.startsWith('http') ? img : `${BASE_URL}${img}`) : null;
    }
    return 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <div className="temple-container">
      <h1 className="temple-title">EXPLORE MORE TEMPLES</h1>
      <p className="temple-description">
        Reserve Prasadam and Pujas for yourself and your family at over 1,000 renowned temples across India.
      </p>

      <div className="search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search temples..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <button className="btn btn-primary" type="button">
          Search
        </button>
      </div>

      <div className="temple-grid">
        {loading
          ? Array(10).fill(0).map((_, idx) => <SkeletonCard key={idx} />)
          : paginated.map((temple) => (
              <div
                key={temple.id}
                className="temple-card"
              >
                <img
                  src={getImageUrl(temple)}
                  alt={temple.name}
                  onClick={() => navigate(`/temples/${temple.id}`)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{temple.name}</h5>
                  <p className="temple-location">{temple.district || temple.taluk || 'Unknown Location'}</p>
                  <button className="btn btn-outline-primary" onClick={() => navigate(`/temples/${temple.id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
      </div>

      {!loading && (
        <div className="pagination-container">
          <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={page === 1}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-secondary"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TempleList;
