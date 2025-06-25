// src/pages/PujaDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const PujaDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2>Puja Details</h2>
      <p>Showing details for Puja ID: <strong>{id}</strong></p>
      {/* You can later fetch actual data here */}
    </div>
  );
};

export default PujaDetails;
