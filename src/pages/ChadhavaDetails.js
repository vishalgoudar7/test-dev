// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/ChadhavaDetails.css";

// const ChadhavaDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const assignedItems = state?.assignedItems || [];

//   if (!assignedItems || assignedItems.length === 0) {
//     return (
//       <div className="chadhava-wrapper">
//         <p className="error-text">No assigned items available.</p>
//         <button className="chadhava-btn" onClick={() => navigate("/chadhava")}>
//           Back to Offerings
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="chadhava-wrapper">
//       <h1 className="chadhava-title">🛕 Assigned Items Details</h1>

//       <div className="chadhava-details">
//         <div className="assigned-items">
//           <h4>Assigned Items:</h4>
//           <ul>
//             {assignedItems.map((ai) => (
//               <li key={ai.id}>
//                 {ai.name} - ₹{ai.cost}
//                 {ai.description && <span> ({ai.description})</span>}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <button className="chadhava-btn" onClick={() => navigate("/chadhava")}>
//           Back to Offerings
//         </ button>
//       </div>
//     </div>
//   );
// };

// export default ChadhavaDetails;




















import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ChadhavaDetails.css";

const ChadhavaDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const assignedItems = state?.assignedItems || [];
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle checkbox toggle for selecting items
  const handleSelectItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to add to the cart.");
      return;
    }
    console.log("Items added to cart:", selectedItems); // Debug log
    navigate("/cart", { state: { cartItems: selectedItems } });
  };

  if (!assignedItems || assignedItems.length === 0) {
    return (
      <div className="chadhava-wrapper">
        <p className="error-text">No assigned items available.</p>
        <button className="chadhava-btn" onClick={() => navigate("/chadhava")}>
          Back to Offerings
        </button>
      </div>
    );
  }

  return (
    <div className="chadhava-wrapper">
      <h1 className="chadhava-title">🛕 Assigned Items Details</h1>

      <div className="chadhava-details">
        <div className="assigned-items">
          <h4>Assigned Items:</h4>
          <ul>
            {assignedItems.map((ai) => (
              <li key={ai.id}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(ai)}
                  onChange={() => handleSelectItem(ai)}
                />
                {ai.name} - ₹{ai.cost}
                {ai.description && <span> ({ai.description})</span>}
              </li>
            ))}
          </ul>
        </div>

        <button className="chadhava-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ChadhavaDetails;