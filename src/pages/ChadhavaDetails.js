

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ChadhavaDetails.css";

const ChadhavaDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;
  const assignedItems = item?.assigned_items || [];
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

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const poojaChadhavaId = item.pooja_chadhava?.id;

    if (!poojaChadhavaId) {
      alert("Cannot add to cart. Item ID is missing.");
      return;
    }

    const assignedItemsIds = selectedItems.map(i => i.id).sort().join('-');
    const cartItemId = `${poojaChadhavaId}-${assignedItemsIds}`;

    const totalCost = selectedItems.reduce((total, currentItem) => total + currentItem.cost, 0);

    const existingItem = cart.find(cartItem => cartItem.id === cartItemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: cartItemId,
        name: item.name,
        cost: totalCost,
        quantity: 1,
        assigned_items: selectedItems,
        image: item.temple?.images?.[0]?.image,
        temple: item.temple?.name,
        pooja_chadhava_id: poojaChadhavaId
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    navigate('/cart');
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