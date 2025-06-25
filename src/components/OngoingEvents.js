// src/components/OngoingEvents.js
import React from 'react';
import Slider from 'react-slick';
import '../styles/OngoingEvents.css';
import moment from 'moment';

const OngoingEvents = ({ events, viewEvent }) => {
  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 300,
    speed: 200,
    slidesToShow: window.innerWidth >= 768 ? 1 : 1,
    slidesToScroll: 1,
  };

  if (!events || events.length === 0) return null;

  return (
    <section className="do_section">
      <Slider {...settings}>
        {events.map((item, index) =>
          item.event_devotee ? (
            <div className="carousel-item-wrapper" key={index}>
              <div className="event-card">
                <div className="image-wrapper">
                  <img
                    src={item.temple.images[0]?.image}
                    alt={item.pooja.name}
                    className="event-img"
                  />
                  <div className="caption">
                    <div className="title">{item.pooja.name}</div>
                    <div className="subtitle">{item.pooja.details}</div>
                  </div>
                </div>
                <div className="footer" onClick={() => viewEvent(item.name)}>
                  <div className="date">{moment(item.end).format('MMMM Do')}</div>
                  <div className="details">
                    View Details <i className="fa fa-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </Slider>
    </section>
  );
};

export default OngoingEvents;




// // components/OngoingEvents.jsx
// import React from 'react';
// import moment from 'moment';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
// import './OngoingEvents.css';

// const OngoingEvents = ({ events }) => {
//   if (!events || events.length === 0) return null;

//   return (
//     <section className="do_section">
//       <div className="heading_container">
//         <h2>Ongoing Event's</h2>
//         <p>
//           Immerse yourself in the enchantment of a unique puja, a captivating
//           ritual that uplifts the spirit and brings blessings into your life.
//         </p>
//       </div>

//       <Carousel
//         autoPlay
//         interval={10000}
//         transitionTime={500}
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         emulateTouch
//       >
//         {events.map((item, index) => (
//           item.event_devotee && (
//             <div className="carousel-slide" key={index}>
//               <img
//                 src={item.temple?.images?.[0]?.image || ''}
//                 alt="Event"
//                 className="event-image"
//               />
//               <div className="carousel-caption-custom-1">
//                 <div className="titletext">{item.pooja?.name}</div>
//                 <div className="subtitletext">{item.pooja?.details}</div>
//               </div>
//               <div className="event-footer" onClick={() => alert(`Viewing ${item.name}`)}>
//                 <div className="event-date">{moment(item.end).format("MMMM Do")}</div>
//                 <div className="event-action">
//                   View Details <i className="fa fa-arrow-right" />
//                 </div>
//               </div>
//             </div>
//           )
//         ))}
//       </Carousel>
//     </section>
//   );
// };

// export default OngoingEvents;
