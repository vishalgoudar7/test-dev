

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/TempleDetails.css';
import api from '../api/api';

const TempleDetails = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [tabNo, setTabNo] = useState(4); // default: Prasadam
  const [search, setSearch] = useState('');

  const [allPoojas, setAllPoojas] = useState([]);
  const [allPrasads, setAllPrasads] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const token = 'c91ae32509fa4ce4e8c21aa4a86118100f97c4f2';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/v1/devotee/temple/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = response.data;
        setTemple(data);
        const poojas = data.poojas || [];
        const prasads = poojas.filter(item => item.name?.toLowerCase().includes('prasad'));

        setAllPoojas(poojas.filter(item => !item.name?.toLowerCase().includes('prasad')));
        setAllPrasads(prasads);

        // Set filtered data according to default tab
        if (tabNo === 4) {
          setFilteredData(prasads);
        } else if (tabNo === 2) {
          setFilteredData(poojas);
        }

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleTabSwitch = (tab) => {
    setTabNo(tab);
    setSearch('');
    if (tab === 2) {
      setFilteredData(allPoojas);
    } else if (tab === 4) {
      setFilteredData(allPrasads);
    } else {
      setFilteredData([]);
    }
  };

  const handleSearch = () => {
    if (tabNo === 2) {
      const result = allPoojas.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    } else if (tabNo === 4) {
      const result = allPrasads.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }
  };

  const renderCards = (data) =>
    data.map((item, i) => (
      <div className="col-md-4 col-lg-3 mb-4" key={i}>
        <div className="card shadow h-100">
          <div className="card-body">
            <h5 className="pooja-title">🌸 {item.name}</h5>
            {item.images?.[0] && (
              <img
                src={item.images[0].image}
                alt=""
                className="img-fluid rounded pooja-img"
              />
            )}
            <p><strong>Details:</strong> {item.details}</p>
            <p><strong>Includes:</strong> <span dangerouslySetInnerHTML={{ __html: item.included }} /></p>
            <p><strong>Benefits:</strong> <span dangerouslySetInnerHTML={{ __html: item.excluded }} /></p>
            <p><strong>Cost:</strong> ₹{item.original_cost}/-</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-sm btn-primary w-100">Book</button>
          </div>
        </div>
      </div>
    ));

  if (!temple) return <p>Loading...</p>;

  return (
    <main className="temple-main">
      <section className="temple-container container py-5">
        <h2 className="temple-name">{temple.name}</h2>
        <p className="temple-address">📍 {temple.address}</p>

        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={500}
          centerMode
          centerSlidePercentage={33.33}
          className="temple-carousel"
        >
          {temple.images?.map((img, idx) => (
            <div key={idx}>
              <img src={img.image} alt={`Temple ${idx + 1}`} className="rounded temple-carousel-img" />
            </div>
          ))}
        </Carousel>

        <ul className="nav nav-tabs justify-content-center mt-4 tab-list">
          <li className="nav-item" onClick={() => handleTabSwitch(4)}>
            <span className={`nav-link ${tabNo === 4 ? 'active' : ''}`}>Prasadam</span>
          </li>
          <li className="nav-item" onClick={() => handleTabSwitch(2)}>
            <span className={`nav-link ${tabNo === 2 ? 'active' : ''}`}>Puja / Udi / Chadhava</span>
          </li>
          <li className="nav-item" onClick={() => handleTabSwitch(3)}>
            <span className={`nav-link ${tabNo === 3 ? 'active' : ''}`}>e-Services</span>
          </li>
          <li className="nav-item" onClick={() => handleTabSwitch(1)}>
            <span className={`nav-link ${tabNo === 1 ? 'active' : ''}`}>About Temple</span>
          </li>
        </ul>

        <div className="tab-content mt-4">
          {(tabNo === 2 || tabNo === 4) && (
            <>
              <div className="row mb-4">
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={`Search for ${tabNo === 2 ? 'Pooja' : 'Prasadam'}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-lg btn-primary w-100" onClick={handleSearch}>Search</button>
                </div>
              </div>

              <div className="row">
                {filteredData.length > 0 ? renderCards(filteredData) : <p className="text-center">No items found.</p>}
              </div>
            </>
          )}

          {tabNo === 3 && <h4 className="text-center text-muted">e-Services coming soon...</h4>}

          {tabNo === 1 && (
            <div className="row mt-4">
              <div className="col-md-8">
                <h4>Description</h4>
                <p>{temple.details}</p>

                <h4 className="mt-4">Image Gallery</h4>
                <div className="row g-3">
                  {temple.images?.map((img, i) => (
                    <div className="col-md-4" key={i}>
                      <img src={img.image} className="img-fluid rounded" alt={`Temple ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4">
                <h5>Get Directions</h5>
                <ul className="list-group">
                  <li className="list-group-item"><strong>Taluk:</strong> {temple.taluk}</li>
                  <li className="list-group-item"><strong>District:</strong> {temple.district}</li>
                  <li className="list-group-item"><strong>City:</strong> {temple.city}</li>
                  <li className="list-group-item"><strong>State:</strong> {temple.state}</li>
                  <li className="list-group-item"><strong>Pincode:</strong> {temple.pincode}</li>
                  <li className="list-group-item"><strong>Website:</strong> {temple.website}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default TempleDetails;
