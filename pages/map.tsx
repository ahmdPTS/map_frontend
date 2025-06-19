import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function MapPage() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sites`)
      .then(res => res.json())
      .then(data => {
        setSites(data);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des sites :", err);
      });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Map sites={sites} />
    </div>
  );
}