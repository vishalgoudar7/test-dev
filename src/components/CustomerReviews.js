// src/components/CustomerReviews.js
import React, { useState, useEffect } from "react";
import "../styles/CustomerReviews.css";

// 👉 20 Dummy customer reviews
const reviews = [
  {
    name: "Rohit Sharma",
    place: "Bangalore",
    review:
      "Booking a puja through Devalaya was so simple. The live streaming gave me the feeling of being inside the temple. Receiving prasadam at home made the whole experience complete.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Nair",
    place: "Kochi",
    review:
      "My father couldn’t travel due to health issues, but Devalaya made it possible to offer puja from home. The chadhava process was smooth, and we felt truly connected to the divine.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ankit Verma",
    place: "Lucknow",
    review:
      "I ordered a special Rudrabhishek puja. The priest performed everything with so much devotion. When the prasadam arrived, it felt blessed and full of positive energy.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Shalini Deshpande",
    place: "Pune",
    review:
      "Devalaya is a blessing for families staying away from their hometown temples. We offered chadhava online and still felt the same devotion as being there in person.",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    name: "Amit Tiwari",
    place: "Varanasi",
    review:
      "The puja arrangements were authentic, and we received the video recording within hours. My mother was so happy to see everything happening so beautifully.",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Kavita Rao",
    place: "Hyderabad",
    review:
      "I booked a Satyanarayan Katha for my home. The whole process was professional and divine. The prasadam was neatly packed and delivered on time.",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "Vikram Joshi",
    place: "Delhi",
    review:
      "The booking system was seamless, and the puja was conducted with so much dedication. It felt truly divine.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Sneha Reddy",
    place: "Chennai",
    review:
      "I loved the way everything was organized. The chadhava felt very authentic and holy.",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    name: "Suresh Patil",
    place: "Nagpur",
    review:
      "I was amazed by how quickly the prasadam reached us. Truly grateful to Devalaya.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Meena Gupta",
    place: "Jaipur",
    review:
      "This platform makes connecting with God so simple, even from far away. Wonderful initiative!",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Rajesh Singh",
    place: "Patna",
    review:
      "I booked a puja for my parents. They were very happy with the rituals and prasadam delivery.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Nisha Kumari",
    place: "Ranchi",
    review:
      "The priests performed the rituals so beautifully. We felt divine blessings at home.",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Arjun Mehta",
    place: "Indore",
    review:
      "A very smooth experience. The puja videos made us feel like we were at the temple itself.",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    name: "Divya Kapoor",
    place: "Amritsar",
    review:
      "Devalaya gave us the perfect way to connect spiritually while staying home. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Harish Kumar",
    place: "Mysore",
    review:
      "The puja was performed with proper mantras and devotion. Truly blessed service.",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    name: "Anjali Mishra",
    place: "Bhopal",
    review:
      "The prasadam was so fresh and neatly packed. Felt so connected to God!",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
  },
  {
    name: "Ramesh Iyer",
    place: "Coimbatore",
    review:
      "For people like us staying far from temples, Devalaya is a true blessing. Beautifully managed!",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    name: "Sonia D’Souza",
    place: "Mangalore",
    review:
      "I booked online puja for my family. Everything was done so perfectly, and we felt blessed.",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    name: "Manoj Kulkarni",
    place: "Aurangabad",
    review:
      "Amazing initiative! The whole process from booking to prasadam delivery was smooth.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Pooja Sharma",
    place: "Delhi",
    review:
      "It’s such a divine experience to be part of the rituals virtually. Thank you Devalaya!",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
  },
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay: move 1 review at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? reviews.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="customer-reviews-section">
      <div className="text-center">
        <h5 className="section-title">Customers Reviews</h5>
      </div>

      {/* ✅ Sliding container */}
      <div className="slider-container">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {reviews.concat(reviews).map((review, idx) => (
            <div key={idx} className="review-card">
              <img
                src={review.image}
                alt={review.name}
                className="review-image"
              />
              <p className="review-text">“{review.review}”</p>
              <h6 className="review-author">{review.name}</h6>
              <p className="review-place">{review.place}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="review-navigation">
        <button className="nav-btn" onClick={handlePrev}>
          &lt;
        </button>
        <button className="nav-btn" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default CustomerReviews;






















