// // src/pages/SubCategoryPage.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/api";
// import "../styles/SubCategoryPage.css";

// const fallbackImage = "/assets/images/placeholder.png";

// const SubCategoryPage = () => {
//   const { categoryId } = useParams();
//   const [subCategories, setSubCategories] = useState([]);

//   useEffect(() => {
//     fetchSubCategories();
//   }, [categoryId]);

//   const fetchSubCategories = async () => {
//     try {
//       const res = await api.get(`/api/v1/category/sub_category/?category=${categoryId}`);
//       setSubCategories(res.data.results);
//     } catch (error) {
//       console.error("Failed to load subcategories", error);
//     }
//   };

//   return (
//     <div className="subcategory-page container">
//       <h2 className="text-center my-4">Available Pujas</h2>
//       <div className="row">
//         {subCategories.length > 0 ? (
//           subCategories.map((sub) => (
//             <div key={sub.id} className="col-6 col-md-4 col-lg-3 mb-4 text-center">
//               <div className="pooja-card shadow-sm">
//                 <img
//                   src={sub.image || fallbackImage}
//                   className="pooja-image"
//                   alt={sub.name}
//                 />
//                 <h6 className="mt-2 pooja-name">{sub.name}</h6>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No pujas found for this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubCategoryPage;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/SubCategoryPage.css";

const fallbackImage = "/assets/images/placeholder.png";

const SubCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  const fetchSubCategories = async () => {
    try {
      const res = await api.get(`/api/v1/category/sub_category/?category=${categoryId}`);
      setSubCategories(res.data.results);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleViewDetails = (subId) => {
    navigate(`/List/category/${categoryId}/sub_category/${subId}`);
  };

  return (
    <div className="subcategory-page container">
      <h2 className="subcategory-title text-center mb-4">Special puja's</h2>
      <div className="row justify-content-center">
        {subCategories.map((sub) => (
          <div key={sub.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="subcategory-card shadow">
              <img
                src={sub.image || fallbackImage}
                alt={sub.name}
                className="subcategory-image"
              />
              <div className="subcategory-content text-center">
                <h6 className="subcategory-name">🙏 {sub.name}</h6>
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(sub.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPage;
