// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-coverflow";

// const TempleImagesCoverflow = ({ templeId }) => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetch(`https://your-api-url.com/temples/${templeId}/images`) // replace with real API
//       .then((res) => res.json())
//       .then((data) => setImages(data))
//       .catch((err) => console.error("Error fetching images:", err));
//   }, [templeId]);

//   return (
//     <div style={{ background: "#111", padding: "20px 0" }}>
//       <Swiper
//         modules={[Navigation, Autoplay, EffectCoverflow]}
//         navigation={true}
//         loop={true} // infinite loop
//         autoplay={{
//           delay: 1500, // 1.5 seconds
//           disableOnInteraction: false,
//         }}
//         effect="coverflow"
//         centeredSlides={true}
//         slidesPerView={3} // always 3 visible
//         grabCursor={true}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: 0,
//           depth: 200,
//           modifier: 1.5,
//           slideShadows: false,
//         }}
//         speed={800} // smooth transition
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//             <img
//               src={img.url}
//               alt={`Temple Image ${index + 1}`}
//               style={{
//                 width: "100%",
//                 height: "350px",
//                 objectFit: "cover",
//                 borderRadius: "10px",
//               }}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TempleImagesCoverflow;
