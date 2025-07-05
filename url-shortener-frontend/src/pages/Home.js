import React from 'react';
import ShortenerForm from '../components/ShortenerForm';

function Home() {
  return (
    <div className="page-container">
      <h1 className="title">INBA URL Shortener</h1>
      <p className="subtitle">Resize Your Long Relation into Your Hands ✨</p>
      <ShortenerForm />
    </div>
  );
}

export default Home;