// src/pages/ChadhavaDetails.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import api from "../api/api";
import "../styles/ChadhavaDetails.css";
import TempleImageGallery from "../components/TempleImageGallery";

// Load Razorpay
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Fetch Razorpay Key
const fetchRazorpayKey = async () => {
  try {
    const response = await api.get("https://beta.devalayas.com/api/v1/devotee/payment_key/");
    return response.data.key;
  } catch (err) {
    console.error("Failed to load Razorpay key:", err);
    alert("Payment gateway not available.");
    return null;
  }
};

const ChadhavaDetails = () => {
  const navigate = useNavigate();
  const { profile } = useUserAuth();

  const [assignedItems, setAssignedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Checkout form state
  const [address, setAddress] = useState({
    bookingDate: "",
    devoteeName: "",
    devoteeMobile: "",
    sankalpa: "",
    nakshatra: "",
    familyMember: "",
    street1: "",
    street2: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [charges, setCharges] = useState({
    subtotal: 0,
    convenienceFee: 5.0,
    shipping: 0,
    gst: 0,
    total: 0,
  });

  // Fetch chadhava items
  useEffect(() => {
    const fetchChadhavas = async () => {
      try {
        setLoading(true);
        const res = await api.get("https://beta.devalayas.com/api/v1/devotee/chadhava/");
        const data = res.data;

        const allItems = data?.results?.length
          ? data.results.flatMap((chadhava) =>
            chadhava.assigned_items.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              cost: parseFloat(item.cost) || 0,
              image: item.image,
              pooja: chadhava.pooja_chadhava?.name || "Chadhava",
              temple: chadhava.pooja_chadhava?.temple?.name || "Unknown Temple",
              templeId: chadhava.pooja_chadhava?.temple?.id,
              poojaId: chadhava.pooja_chadhava?.id,
              quantity: 1,
            }))
          )
          : [];

        if (allItems.length > 0) {
          setAssignedItems(allItems);
        } else {
          setError("No items assigned for offering.");
        }
      } catch (err) {
        console.error("Error fetching chadhava items:", err);
        setError("Failed to load items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchChadhavas();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, { ...item, quantity: 1 }]
    );
  };

  const updateQuantity = (itemId, qty) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    // Prefill from profile
    const devoteeName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
    setAddress((prev) => ({
      ...prev,
      devoteeName: devoteeName,
      devoteeMobile: profile?.phone || "",
      familyMember: devoteeName,
    }));

    // Calculate total
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.cost * (item.quantity || 1),
      0
    );
    const gst = (subtotal + 5.0) * 0.05;
    const total = subtotal + 5.0 + gst;

    setCharges({ subtotal, convenienceFee: 5.0, shipping: 0, gst, total });

    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!address.bookingDate) newErrors.bookingDate = "Required";
    if (!address.devoteeName) newErrors.devoteeName = "Required";
    if (!address.devoteeMobile || !/^\d{10}$/.test(address.devoteeMobile))
      newErrors.devoteeMobile = "Valid 10-digit mobile";
    if (!address.sankalpa) newErrors.sankalpa = "Required";
    if (!address.nakshatra) newErrors.nakshatra = "Required";
    if (!address.familyMember) newErrors.familyMember = "Required";
    if (!address.street1) newErrors.street1 = "Required";
    if (!address.area) newErrors.area = "Required";
    if (!address.city) newErrors.city = "Required";
    if (!address.state) newErrors.state = "Required";
    if (!address.pincode || !/^\d{6}$/.test(address.pincode))
      newErrors.pincode = "6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        requests: selectedItems.map((item) => ({
          is_chadhava: true,
          is_prasadam_delivery: true, // Always true to get delivery charges
          pooja: item.poojaId,
          temple: item.templeId,
          requested_chadhava_items: [
            {
              id: item.id,
              quantity: item.quantity || 1,
              cost: item.cost,
            },
          ],
          pooja_date: address.bookingDate,
          devotee_name: address.devoteeName,
          devotee_number: `+91${address.devoteeMobile}`,
          sankalpa: address.sankalpa,
          nakshatra: address.nakshatra,
          family_member: [{ name: address.familyMember }],
          prasadam_address: {
            name: address.devoteeName,
            street_address_1: address.street1,
            street_address_2: address.street2 || "",
            area: address.area,
            city: address.city,
            state: address.state,
            pincode: parseInt(address.pincode, 10),
            phone_number: address.devoteeMobile,
          },
          billing_address: {
            name: address.devoteeName,
            street_address_1: address.street1,
            street_address_2: address.street2 || "",
            area: address.area,
            city: address.city,
            state: address.state,
            pincode: parseInt(address.pincode, 10),
            phone_number: address.devoteeMobile,
          },
        })),
      };

      console.log("Payload sent to backend:", payload);

      const response = await api.post("https://beta.devalayas.com/api/v1/devotee/bulk_pooja_request/", payload);
      const order = Array.isArray(response.data) ? response.data[0] : response.data;

      setOrderDetails(order);
      setShowConfirmation(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Order creation failed:", err);
      const message = err.response?.data?.detail || "Something went wrong";
      alert(`Failed: ${message}`);
    }
  };

  const initiatePayment = async (order) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Payment gateway failed to load.");
      return;
    }

    const rzpKey = await fetchRazorpayKey();
    if (!rzpKey) return;

    const { payment_order_id: orderId, payment_data } = order;
    const amount = Math.round((payment_data?.final_total || charges.total) * 100);

    const options = {
      key: rzpKey,
      amount,
      currency: "INR",
      name: "Devalaya",
      description: `${selectedItems.length} Item(s) - Chadhava Offering`,
      image: "https://devalaya-bucket.s3.amazonaws.com/logo_512x512.png",
      order_id: orderId,
      handler: async (rz_response) => {
        try {
          const payload = {
            razorpay_response: rz_response,
            request_id: rz_response.razorpay_payment_id,
            family_member: [{ name: address.familyMember }],
            billing_address: {
              name: address.devoteeName,
              phone_number: address.devoteeMobile,
              street_address_1: address.street1,
              street_address_2: address.street2 || "",
              area: address.area,
              city: address.city,
              state: address.state,
              pincode: parseInt(address.pincode, 10),
            },
          };
          console.log("Payment verification payload:", payload);
          const verificationResponse = await api.post("https://beta.devalayas.com/api/v1/devotee/pooja_request/payment/", payload);

          if (verificationResponse.data.success) {
            const orderDetailsResponse = await api.get(`https://beta.devalayas.com/api/v1/devotee/pooja_request/list/?search=${order.order_id}`);
            handleCloseCheckout();
            navigate(`/payment-success?payment_id=${rz_response.razorpay_payment_id}&order_id=${order.order_id}&status=success`, { state: { orderDetails: orderDetailsResponse.data } });
          } else {
            const message = verificationResponse.data.message || "Payment verification failed";
            navigate(`/payment-success?payment_id=${rz_response.razorpay_payment_id}&order_id=${order.order_id}&status=failed&error=${encodeURIComponent(message)}`);
          }
        } catch (err) {
          console.error("placeOrder error:", err);
          handleCloseCheckout();
          const errorMessage = err.response?.data?.detail || err.message || "Unknown error";
          navigate(`/payment-success?payment_id=${rz_response.razorpay_payment_id || ''}&order_id=${order.order_id}&status=failed&error=${encodeURIComponent(errorMessage)}`);
        }
      },
      prefill: {
        name: address.devoteeName,
        email: profile?.email || "",
        contact: `+91${address.devoteeMobile}`,
      },
      theme: { color: "#e57373" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp.open();
  };

  if (loading) {
    return (
      <div className="chadhava-wrapper">
        <p>Loading assigned items...</p>
      </div>
    );
  }

  if (error || assignedItems.length === 0) {
    return (
      <div className="chadhava-wrapper">
        <p className="error-text">{error || "No items available."}</p>
        <button className="chadhava-btn" onClick={() => navigate("/chadhava")}>
          Back to Offerings
        </button>
      </div>
    );
  }

  return (

    <div className="chadhava-wrapper">

      <div className="row">
        {/* Left 40% - Image Gallery */}
        <div className="col-12 col-md-5">
          {assignedItems.length > 0 && (
            <TempleImageGallery
              images={assignedItems.map(item => ({ image: item.image }))}
            />
          )}
        </div>

        {/* Right 60% - Chadhava Details */}
        <div className="col-12 col-md-7 text-start">
          {assignedItems.length > 0 && (
            <>
              {/* Temple Name */}
              <h5 className="text-primary">
                {assignedItems[0]?.temple?.name || "Temple Name"}
              </h5>

              {/* Chadhava Name */}
              <h1 className="fw-bold">
                {assignedItems[0]?.name || "Chadhava Name"}
              </h1>

              {/* Description / Details */}
              <p className="text-muted">
                {assignedItems[0]?.details || "No details available"}
              </p>

              {/* Benefits */}
              <div className="mb-2">
                <h6 className="fw-bold">Benefits:</h6>
                <p>{assignedItems[0]?.benefits || "Not provided"}</p>
              </div>

              {/* Includes */}
              <div>
                <h6 className="fw-bold">Includes:</h6>
                {assignedItems[0]?.included ? (
                  <ul>
                    {assignedItems[0].included.split(",").map((inc, idx) => (
                      <li key={idx}>{inc.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No items specified</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="chadhava-details">
        <div className="assigned-items">
          <h1 className="chadhava-title">🛕 Assigned Items</h1>
          <ul>
            {assignedItems.map((item) => (
              <li key={item.id} className="assigned-item-card">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="assigned-item-image"
                />
                <div className="assigned-item-details">
                  <div className="assigned-item-name">
                    <label>{item.name}</label>
                  </div>
                  <p className="assigned-item-description">{item.description}</p>
                  <p className="assigned-item-meta">Temple: {item.temple}</p>
                  <p className="assigned-item-cost">Cost: ₹{item.cost.toFixed(2)}</p>

                  {selectedItems.some((si) => si.id === item.id) ? (
                    <div style={{ marginTop: "6px", fontSize: "13px" }}>
                      <label>Qty: </label>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) - 1)
                        }
                        disabled={(item.quantity || 1) <= 1}
                        style={{
                          width: "24px",
                          background: "#f0f0f0",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        −
                      </button>
                      <span style={{ margin: "0 8px" }}>
                        {selectedItems.find((si) => si.id === item.id)
                          ?.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) + 1)
                        }
                        style={{
                          width: "24px",
                          background: "#f0f0f0",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : null}

                  <button
                    className="add-btn"
                    onClick={() => handleSelectItem(item)}
                  >
                    {selectedItems.some((si) => si.id === item.id)
                      ? "Remove"
                      : "Add"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="chadhava-btn" onClick={handleAddToCart}>
          Add to Cart ({selectedItems.length})
        </button>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="chadhava-checkout-overlay" onClick={handleCloseCheckout}>
          <div
            className="chadhava-checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chadhava-checkout-header">
              <h3>Complete Your Offering</h3>
              <button className="close-btn" onClick={handleCloseCheckout}>
                ✕
              </button>
            </div>

            <div className="chadhava-checkout-body">
              <div className="checkout-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-scrollable-area">
                    <div className="form-group">
                      <label>Booking Date <span className="required-star">*</span></label>
                      <input
                        type="date"
                        name="bookingDate"
                        value={address.bookingDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                      {errors.bookingDate && (
                        <span className="error">{errors.bookingDate}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Devotee Name <span className="required-star">*</span></label>
                      <input
                        type="text"
                        name="devoteeName"
                        value={address.devoteeName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                      />
                      {errors.devoteeName && (
                        <span className="error">{errors.devoteeName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Mobile Number <span className="required-star">*</span></label>
                      <input
                        type="tel"
                        name="devoteeMobile"
                        value={address.devoteeMobile}
                        onChange={handleInputChange}
                        placeholder="10-digit number"
                        maxLength={10}
                      />
                      {errors.devoteeMobile && (
                        <span className="error">{errors.devoteeMobile}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Sankalpa <span className="required-star">*</span></label>
                      <input
                        type="text"
                        name="sankalpa"
                        value={address.sankalpa}
                        onChange={handleInputChange}
                        placeholder="e.g., For health and prosperity"
                      />
                      {errors.sankalpa && (
                        <span className="error">{errors.sankalpa}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Nakshatra <span className="required-star">*</span></label>
                      <input
                        type="text"
                        name="nakshatra"
                        value={address.nakshatra}
                        onChange={handleInputChange}
                        placeholder="e.g., Rohini, Mrigashira"
                      />
                      {errors.nakshatra && (
                        <span className="error">{errors.nakshatra}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Offering For <span className="required-star">*</span></label>
                      <input
                        type="text"
                        name="familyMember"
                        value={address.familyMember}
                        onChange={handleInputChange}
                        placeholder="e.g., Self, Father, Mother"
                      />
                      {errors.familyMember && (
                        <span className="error">{errors.familyMember}</span>
                      )}
                    </div>

                    <h5 style={{ marginTop: "16px" }}>
                      Prasadam Delivery Address
                    </h5>

                    <div className="form-group">
                      <label>Street Address 1 <span className="required-star">*</span></label>
                      <input
                        type="text"
                        name="street1"
                        value={address.street1}
                        onChange={handleInputChange}
                        placeholder="House, Street"
                      />
                      {errors.street1 && (
                        <span className="error">{errors.street1}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Street Address 2 (Optional)</label>
                      <input
                        type="text"
                        name="street2"
                        value={address.street2}
                        onChange={handleInputChange}
                        placeholder="Apartment, floor"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label>Area <span className="required-star">*</span></label>
                        <input
                          type="text"
                          name="area"
                          value={address.area}
                          onChange={handleInputChange}
                        />
                        {errors.area && (
                          <span className="error">{errors.area}</span>
                        )}
                      </div>
                      <div className="form-group half">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={address.pincode}
                          onChange={handleInputChange}
                          maxLength={6}
                        />
                        {errors.pincode && (
                          <span className="error">{errors.pincode}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label>City <span className="required-star">*</span></label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleInputChange}
                        />
                        {errors.city && (
                          <span className="error">{errors.city}</span>
                        )}
                      </div>
                      <div className="form-group half">
                        <label>State <span className="required-star">*</span></label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleInputChange}
                        />
                        {errors.state && (
                          <span className="error">{errors.state}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="pay-btn" disabled={loading}>
                    {loading
                      ? "Processing..."
                      : `Save address and Proceed to payment`}
                  </button>
                </form>
              </div>
              <div className="checkout-summary">
                <div className="chadhava-item-summary">
                  <h4>Selected Items ({selectedItems.length})</h4>
                  {selectedItems.map((item) => (
                    <p key={item.id}>
                      {item.name} × {item.quantity || 1} @ ₹
                      {item.cost.toFixed(2)}
                    </p>
                  ))}
                </div>
                <div className="price-summary">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>₹{charges.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>Convenience Fee</span>
                    <p>To be calculated</p>
                  </div>
                  <div className="price-row">
                    <span>Shipping</span>
                    <p>To be calculated</p>

                  </div>
                  <div className="price-row">
                    <span>GST </span>
                    <p>To be calculated</p>

                  </div>
                  <div className="price-row total">
                    <span>Total</span>
                    <p>To be calculated</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && orderDetails && (
        <div className="chadhava-checkout-overlay">
          <div className="chadhava-checkout-modal">
            <div className="chadhava-checkout-header">
              <h3>Confirm Your Order</h3>
              <button className="close-btn" onClick={() => setShowConfirmation(false)}>
                ✕
              </button>
            </div>
            <div className="chadhava-checkout-body">
              <div className="confirmation-details">
                <h4>Delivery Address</h4>
                <p>{address.devoteeName}</p>
                <p>{address.street1}</p>
                {address.street2 && <p>{address.street2}</p>}
                <p>{address.area}, {address.city}, {address.state} - {address.pincode}</p>
                <p>Mobile: {address.devoteeMobile}</p>

                <div className="price-summary" style={{ marginTop: '20px' }}>
                  <h4>Price Details</h4>
                  <div className="price-row">
                    <span>Chadhava Cost</span>
                    <span>₹{orderDetails.payment_data.original_chadhava_cost}</span>
                  </div>
                  <div className="price-row">
                    <span>Convenience Fee</span>
                    <span>₹{orderDetails.payment_data.convenience_fee}</span>
                  </div>
                  <div className="price-row">
                    <span>Delivery Charge</span>
                    <span>₹{orderDetails.payment_data.delivery_charge}</span>
                  </div>
                  <div className="price-row">
                    <span>Tax</span>
                    <span>₹{orderDetails.payment_data.total_tax}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total</span>
                    <span>₹{orderDetails.payment_data.final_total}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="chadhava-checkout-footer">
              <button className="pay-btn" onClick={() => initiatePayment(orderDetails)}>
                Confirm and Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChadhavaDetails;