import { useState, useEffect } from 'react';

export const basicOptions = {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "f8ba84be2cmshd0212981579d93cp19d121jsn4ce2ed0920cf"
  }
}

export const corsOptions = {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

const useStats = (url, options) => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await fetch(url, options)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, [url]);
  return {
    stats,
    loading,
    error,
  };
}

export default useStats; 