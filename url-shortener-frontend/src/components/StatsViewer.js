import React, { useState } from 'react';
import api from '../utils/api';
import { useLogger } from '../hooks/useLogger';

function StatsViewer() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);
  const { log } = useLogger();

  const fetchStats = async () => {
    try {
      const res = await api.get(`/shorturls/${code}`);
      setStats(res.data);
      log("frontend", "info", "component", `Stats fetched for: ${code}`);
    } catch (err) {
      log("frontend", "error", "component", `Stats fetch failed: ${err.message}`);
    }
  };

  return (
    <div className="stats-viewer">
      <input className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="🔍 Enter shortcode" />
      <button className="submit-btn" onClick={fetchStats}>📊 Get Stats</button>
      {stats && <pre className="stats-output">{JSON.stringify(stats, null, 2)}</pre>}
    </div>
  );
}

export default StatsViewer;