


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTemples, setSearch } from '../redux/templeSlice'; // Adjust path as needed
// import { useNavigate } from 'react-router-dom';

// const TempleList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     temples = [],
//     loading = false,
//     error = '',
//     search = ''
//   } = useSelector((state) => state.temples || {});

//   const [page, setPage] = useState(1);
//   const pageSize = 15;

//   useEffect(() => {
//     dispatch(fetchTemples());
//   }, [dispatch]);

//   const filteredTemples = temples.filter((temple) =>
//     temple.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredTemples.length / pageSize);
//   const paginated = filteredTemples.slice((page - 1) * pageSize, page * pageSize);

//   const handlePageClick = (number) => setPage(number);
//   const handlePrev = () => page > 1 && setPage(page - 1);
//   const handleNext = () => page < totalPages && setPage(page + 1);

//   // ✅ Image resolver
//   const getImageUrl = (temple) => {
//     const BASE_URL = "https://beta.devalayas.com";

//     if (temple.image_url && temple.image_url !== "null") {
//       return temple.image_url.startsWith("http")
//         ? temple.image_url
//         : `${BASE_URL}${temple.image_url}`;
//     }

//     if (temple.images && temple.images.length > 0) {
//       const img = temple.images[0]?.url || temple.images[0]?.image;
//       if (img && img !== "null") {
//         return img.startsWith("http") ? img : `${BASE_URL}${img}`;
//       }
//     }

//     return "https://via.placeholder.com/300x200?text=No+Image";
//   };

//   if (loading) {
//     return <div className="text-center py-5">⏳ Loading temples...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">❌ {error}</div>;
//   }

//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-4 text-primary">EXPLORE MORE TEMPLES</h1>
//       <p className="text-center mb-4">
//         Reserve Prasadam and Pujas for yourself and your family at over 1,000 renowned temples across India, all under your name.
//       </p>

//       {/* 🔍 Search */}
//       <div className="input-group mb-4">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search temples..."
//           value={search}
//           onChange={(e) => dispatch(setSearch(e.target.value))}
//         />
//         <button className="btn btn-primary" type="button" onClick={() => dispatch(fetchTemples())}>
//           Search
//         </button>
//       </div>

//       {/* 🛕 Cards */}
//       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 g-4">
//         {paginated.map((temple) => (
//           <div key={temple.id} className="col">
//             <div
//               className="card h-100 shadow-sm"
//               onClick={() => navigate(`/temples/${temple.id}`)}
//               style={{ cursor: 'pointer' }}
//             >
//               <img
//                 src={getImageUrl(temple)}
//                 alt={temple.name}
//                 className="card-img-top"
//                 style={{ height: '180px', objectFit: 'cover' }}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
//                 }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title text-primary">{temple.name}</h5>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 📄 Pagination */}
//       <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
//         <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={page === 1}>
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => handlePageClick(i + 1)}
//             className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           className="btn btn-outline-secondary"
//           onClick={handleNext}
//           disabled={page === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TempleList;







// src/components/TempleList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTemples, setSearch } from '../redux/templeSlice';
import { useNavigate } from 'react-router-dom';

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
  const pageSize = 15;

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
    const BASE_URL = 'https://live.devalayas.com';

    if (temple.image_url && temple.image_url !== 'null') {
      const fullUrl = temple.image_url.startsWith('http')
        ? temple.image_url
        : `${BASE_URL}${temple.image_url}`;
      return fullUrl;
    }

    if (temple.images && temple.images.length > 0) {
      const img = temple.images[0]?.url || temple.images[0]?.image;
      if (img && img !== 'null') {
        const fullUrl = img.startsWith('http') ? img : `${BASE_URL}${img}`;
        return fullUrl;
      }
    }

    return 'https://via.placeholder.com/300x200?text=No+Image';
  };

  if (loading) {
    return <div className="text-center py-5">⏳ Loading temples...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">❌ {error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">EXPLORE MORE TEMPLES</h1>
      <p className="text-center mb-4">
        Reserve Prasadam and Pujas for yourself and your family at over 1,000 renowned temples across India, all under your name.
      </p>

      <div className="input-group mb-4">
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

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 g-4">
        {paginated.map((temple) => (
          <div key={temple.id} className="col">
            <div
              className="card h-100 shadow-sm"
              onClick={() => navigate(`/temples/${temple.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={getImageUrl(temple)}
                alt={temple.name}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{temple.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
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
    </div>
  );
};

export default TempleList;
