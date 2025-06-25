

// import React, { useState } from 'react';
// import '../styles/ExploreTemples.css';
// import templeCards from '../data/templeCards';
// import TempleList from './TempleList';

// const ExploreTemples = () => {
//   const [search, setSearch] = useState('');
//   const [cards, setCards] = useState(
//     templeCards.map((card) => ({ ...card, showDetails: false }))
//   );

//   const searchHandler = () => {
//     console.log('Searching for:', search);
//   };

//   const showDetails = (index) => {
//     const updated = [...cards];
//     updated[index].showDetails = true;
//     setCards(updated);
//   };

//   const hideDetails = () => {
//     setCards(cards.map(card => ({ ...card, showDetails: false })));
//   };

//   return (
//     <div className="container my-5">
//       <h1 className="text-center explore-title">
//         EXPLORE MORE TEMPLES
//       </h1>
//       <p className="text-center explore-subtitle">
//         Reserve Prasadam and Pujas for yourself and your family at over 1,000 renowned temples across India, all under your name.
//       </p>

//       <div className="row justify-content-center mb-4">
//         <div className="col-xl-8">
//           <div className="search-container-flex p-4">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search for Temple"
//               className="form-control form-control-lg custom-search-input"
//               onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
//             />
//             <button className="btn btn-orange btn-lg search-btn" onClick={searchHandler}>
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="card-container">
//         {cards.map((card, index) => (
//           <div
//             className="card-hover"
//             key={card.id}
//             onMouseEnter={() => showDetails(index)}
//             onMouseLeave={hideDetails}
//           >
//             <img
//               src={card.images[0]?.image}
//               alt={card.name}
//               className="card-hover-image"
//             />
//             {card.showDetails && (
//               <div className="card-hover-popup">
//                 <h6 className="popup-temple-name">🙏 {card.name}</h6>
//                 <h6 className="popup-temple-area">📍 {card.area}</h6>
//                 <div className="popup-cta">
//                   Participate Now
//                   <i className="fa fa-arrow-right pl-2 text-light" aria-hidden="true"></i>
//                 </div>
//               </div>
//             )}
//             <h6 className="text-center mt-2">{card.name}</h6>
//           </div>
//         ))}
//       </div>
//     </div>
    
//   );
// };

// export default ExploreTemples;


import React, { useState } from 'react';
import '../styles/ExploreTemples.css';
import templeCards from '../data/templeCards';
import TempleList from './TempleList';

const ExploreTemples = () => {
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState(
    templeCards.map((card) => ({ ...card, showDetails: false }))
  );

  const searchHandler = () => {
    console.log('Searching for:', search);
  };

  const showDetails = (index) => {
    const updated = [...cards];
    updated[index].showDetails = true;
    setCards(updated);
  };

  const hideDetails = () => {
    setCards(cards.map(card => ({ ...card, showDetails: false })));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center explore-title">
        EXPLORE MORE TEMPLES
      </h1>
      <p className="text-center explore-subtitle">
        Reserve Prasadam and Pujas for yourself and your family at over 1,000 renowned temples across India, all under your name.
      </p>

      <div className="row justify-content-center mb-4">
        <div className="col-xl-8">
          <div className="search-container-flex p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Temple"
              className="form-control form-control-lg custom-search-input"
              onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
            />
            <button className="btn btn-orange btn-lg search-btn" onClick={searchHandler}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="card-container">
        {cards.map((card, index) => (
          <div
            className="card-hover"
            key={card.id}
            onMouseEnter={() => showDetails(index)}
            onMouseLeave={hideDetails}
          >
            <img
              src={card.images[0]?.image}
              alt={card.name}
              className="card-hover-image"
            />
            {card.showDetails && (
              <div className="card-hover-popup">
                <h6 className="popup-temple-name">🙏 {card.name}</h6>
                <h6 className="popup-temple-area">📍 {card.area}</h6>
                <div className="popup-cta">
                  Participate Now
                  <i className="fa fa-arrow-right pl-2 text-light" aria-hidden="true"></i>
                </div>
              </div>
            )}
            <h6 className="text-center mt-2">{card.name}</h6>
          </div>
        ))}
      </div>

      {/* ✅ API-based temple cards section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">All Temples</h2>
        <TempleList />
      </div>
    </div>
  );
};

export default ExploreTemples;
