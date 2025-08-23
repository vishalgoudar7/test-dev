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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received state:", state);
    if (state?.assignedItems && state.assignedItems.length > 0) {
      setAssignedItems(state.assignedItems.map(item => ({
        ...item,
        cost: item.cost || 0 // Ensure cost is present, default to 0 if missing
      })));
      setLoading(false);
    } else {
      setError("No assigned items provided.");
      setLoading(false);
    }
  }, [state]);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, { ...item, quantity: item.quantity || 1, cost: item.cost || 0 }]
    );
    console.log("Selected Items:", selectedItems); // Debug selected items
  };

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    if (!item) {
      alert("Cannot add to cart. Item details are missing.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please select at least one item to add to the cart.");
      return;
    }
    console.log("Items added to cart:", selectedItems); // Debug log
    navigate("/cart", { state: { cartItems: selectedItems } });
  };

  const handleBackToOfferings = () => {
    navigate("/chadhava");
  };

  if (loading) {
    return <div className="chadhava-wrapper">Loading...</div>;
  }

  if (error || (!assignedItems || assignedItems.length === 0)) {
    return (
      <div className="chadhava-wrapper">
        <p className="error-text">{error || "No assigned items available."}</p>
        <button className="chadhava-btn" onClick={handleBackToOfferings}>
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
                  checked={selectedItems.some((si) => si.id === ai.id)}
                  onChange={() => handleSelectItem(ai)}
                />
                {ai.name || `Item - ₹${ai.cost || 0}`}
                {ai.description && <span> ({ai.description})</span>}
                {ai.quantity && <span> (Quantity: {ai.quantity})</span>}
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