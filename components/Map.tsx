import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function Map({ sites }: { sites: any[] }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.35, 48.85],
      zoom: 5,
    });

    sites.forEach(site => {
      new mapboxgl.Marker()
        .setLngLat([site.lon, site.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${site.name}</strong><br/>${site.brand}`))
        .addTo(map);
    });

    return () => map.remove();
  }, [sites]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}