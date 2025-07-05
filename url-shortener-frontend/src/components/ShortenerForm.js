import React, { useState } from 'react';
import api from '../utils/api';
import { useLogger } from '../hooks/useLogger';

function ShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState(30);
  const [result, setResult] = useState('');
  const { log } = useLogger();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/shorturls', {
        url,
        validity,
        shortcode
      });
      setResult(response.data.shortLink);
      log("frontend", "info", "component", `Shortened URL created: ${response.data.shortLink}`);
    } catch (err) {
      log("frontend", "error", "component", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shortener-form">
      <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="🌐 Enter long URL" required />
      <input className="input" value={shortcode} onChange={(e) => setShortcode(e.target.value)} placeholder="Custom shortcode" />
      <input className="input" type="number" value={validity} onChange={(e) => setValidity(e.target.value)} placeholder="⏳ Validity in minutes" />
      <button className="submit-btn" type="submit"> Shorten</button>
      {result && <p className="result"> Short URL: <a href={result} target="_blank" rel="noreferrer">{result}</a></p>}
    </form>
  );
}

export default ShortenerForm;