
// src/pages/PujaPage.js
import React from 'react';
import '../styles/PujaPage.css';

const pujas = [
  {
    id: 1,
    title: 'Saturday Shani Hanuman 21 Brahmin Anushthan',
    description: '19,000 Shani Mool Mantra Jaap and 1008 Sankat Mochan Hanuman Ashtak Path',
    benefit: 'For Strength to Overcome Hardships and Misfortunes',
    location: 'Shri Navagrah Shani Temple, Ujjain, Madhya Pradesh',
    date: '21 June, Saturday, Ashadha Krishna Ekadashi',
    image: 'https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1749649287017.webp&w=1920&q=75',
    tag: '21 Brahmin',
  },
  {
    id: 2,
    title: 'Yogini Ekadashi Santaan Sukh Special',
    description: '11,000 Santaan Gopal Mantra Jaap, Shri Laddoo Gopal Panchamrit Abhishek, Santaan Sukh Prapti Havan',
    benefit: 'For the Well-Being of Children and Family',
    location: 'Shri Radha Damodar Mandir, Mathura, Uttar Pradesh',
    date: '21 June, Saturday, Yogini Ekadashi',
    image: 'https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1749824177931.webp&w=1920&q=75',
    tag: 'Yogini Ekadashi',
  },
  {
    id: 3,
    title: 'Yogini Ekadashi Dakshin Kashi Gokarna Tirth Kshetra Special',
    description: 'Narayan Bali Puja, Tripindi Shradh Pitru Dosh Shanti Puja',
    benefit: 'To Relieve Ancestral Curse and Bring peace for departed souls',
    location: 'Gokarna Kshetra, Gokarna, Karnataka',
    date: '21 June, Saturday, Yogini Ekadashi',
    image: 'https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1749931862231.webp&w=1920&q=75',
    tag: 'Yogini Ekadashi',
  },


{
    id: 1,
    title: 'Saturday Shani Hanuman 21 Brahmin Anushthan',
    description: '19,000 Shani Mool Mantra Jaap and 1008 Sankat Mochan Hanuman Ashtak Path',
    benefit: 'For Strength to Overcome Hardships and Misfortunes',
    location: 'Shri Navagrah Shani Temple, Ujjain, Madhya Pradesh',
    date: '21 June, Saturday, Ashadha Krishna Ekadashi',
    image: 'https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1749649287017.webp&w=1920&q=75',
    tag: '21 Brahmin',
  },
  {
    id: 2,
    title: 'Yogini Ekadashi Santaan Sukh Special',
    description: '11,000 Santaan Gopal Mantra Jaap, Shri Laddoo Gopal Panchamrit Abhishek, Santaan Sukh Prapti Havan',
    benefit: 'For the Well-Being of Children and Family',
    location: 'Shri Radha Damodar Mandir, Mathura, Uttar Pradesh',
    date: '21 June, Saturday, Yogini Ekadashi',
    image: 'https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1749824177931.webp&w=1920&q=75',
    tag: 'Yogini Ekadashi',
  },
  {
    id: 3,
    title: 'Yogini Ekadashi Dakshin Kashi Gokarna Tirth Kshetra Special',
    description: 'Narayan Bali Puja, Tripindi Shradh Pitru Dosh Shanti Puja',
    benefit: 'To Relieve Ancestral Curse and Bring peace for departed souls',
    location: 'Gokarna Kshetra, Gokarna, Karnataka',
    date: '21 June, Saturday, Yogini Ekadashi',
    image: 'https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1749931862231.webp&w=1920&q=75',
    tag: 'Yogini Ekadashi',
  },









];

const PujaPage = () => {
  return (
    <div className="puja-page container py-4">
      <h2 className="mb-2">Upcoming Pujas</h2>
      <p className="mb-4">Book puja online with your name and gotra, receive the puja video along with the Aashirwad Box, and gain blessings from the Divine.</p>

      <div className="puja-card-container">
        {pujas.map((puja) => (
          <div className="puja-card" key={puja.id}>
            <div className="tag-label">{puja.tag}</div>
            <img src={puja.image} className="card-img-top" alt={puja.title} />
            <div className="card-body">
              <h6 className="card-title">{puja.title}</h6>
              <p className="card-description">{puja.description}</p>
              <p className="card-benefit">{puja.benefit}</p>
              <p className="card-info">📍 {puja.location}</p>
              <p className="card-info">📅 {puja.date}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-success w-100 d-flex justify-content-between align-items-center">
                PARTICIPATE <span>&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PujaPage;
