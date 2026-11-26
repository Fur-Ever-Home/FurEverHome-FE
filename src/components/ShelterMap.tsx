import { useEffect, useMemo, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ShelterMap.css';

export type ShelterMapPoint = {
  id: number;
  name: string;
  city: string | null;
  county: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
};

type MappedShelter = ShelterMapPoint & { latitude: number; longitude: number };

type ShelterMapProps = {
  shelters: readonly ShelterMapPoint[];
  lang: 'ro' | 'en';
  onShowShelter: (id: number) => void;
};

const labels = {
  ro: {
    map: 'Harta adăposturilor',
    zoomIn: 'Mărește harta',
    zoomOut: 'Micșorează harta',
    close: 'Închide detaliile',
    showShelter: 'Vezi cardul',
    googleDirections: 'Deschide în Google Maps',
    empty: 'Niciun adăpost cu o locație pe hartă pentru selecția curentă.',
  },
  en: {
    map: 'Shelter map',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    close: 'Close details',
    showShelter: 'View shelter card',
    googleDirections: 'Open in Google Maps',
    empty: 'No shelter with a map location matches the current selection.',
  },
};

const iasi: L.LatLngTuple = [47.1585, 27.6014];
const shelterIcon = L.divIcon({
  className: 'shelter-map-marker',
  iconSize: [34, 40],
  iconAnchor: [17, 39],
  tooltipAnchor: [0, -35],
  popupAnchor: [0, -35],
});

function hasCoordinates(shelter: ShelterMapPoint): shelter is MappedShelter {
  const { latitude, longitude } = shelter;
  return latitude !== null && Number.isFinite(latitude) && latitude >= -90 && latitude <= 90
    && longitude !== null && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
}

export default function ShelterMap({ shelters, lang, onShowShelter }: ShelterMapProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const points = useMemo(() => shelters.filter(hasCoordinates), [shelters]);
  const text = labels[lang] || labels.ro;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const map = L.map(host, {
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    });
    mapRef.current = map;

    L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      updateWhenIdle: true,
      updateWhenZooming: false,
      referrerPolicy: 'strict-origin-when-cross-origin',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    const resizeObserver = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    resizeObserver.observe(host);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const zoom = L.control.zoom({
      position: 'topright',
      zoomInTitle: text.zoomIn,
      zoomOutTitle: text.zoomOut,
    }).addTo(map);

    return () => { zoom.remove(); };
  }, [text]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (points.length === 0) {
      map.setView(iasi, 11);
    } else {
      const bounds = L.latLngBounds(points.map(({ latitude, longitude }) => [latitude, longitude]));
      map.fitBounds(bounds, { padding: [44, 44], maxZoom: 14 });
    }
  }, [points]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers = L.layerGroup().addTo(map);
    for (const shelter of points) {
      const coordinates: L.LatLngTuple = [shelter.latitude, shelter.longitude];
      const locality = [...new Set([shelter.city, shelter.county].filter(Boolean))].join(' · ');
      const tooltip = document.createElement('span');
      tooltip.textContent = [shelter.name, locality].filter(Boolean).join(' · ');

      const popup = document.createElement('div');
      popup.className = 'shelter-map-popup';
      const title = document.createElement('strong');
      title.textContent = shelter.name;
      popup.append(title);
      for (const detail of [locality, shelter.address]) {
        if (!detail) continue;
        const line = document.createElement('span');
        line.textContent = detail;
        popup.append(line);
      }

      const showShelter = document.createElement('button');
      showShelter.type = 'button';
      showShelter.className = 'shelter-map-card-link';
      showShelter.textContent = text.showShelter;

      const directions = document.createElement('a');
      const params = new URLSearchParams({ api: '1', destination: coordinates.join(',') });
      directions.href = `https://www.google.com/maps/dir/?${params}`;
      directions.target = '_blank';
      directions.rel = 'noopener noreferrer';
      directions.textContent = text.googleDirections;
      popup.append(showShelter, directions);

      const marker = L.marker(coordinates, { icon: shelterIcon, riseOnHover: true });
      marker.bindTooltip(tooltip, { direction: 'top' });
      marker.bindPopup(popup, { minWidth: 175, maxWidth: 260 });
      marker.on('popupopen', () => {
        marker.closeTooltip();
        const closeButton = marker.getPopup()?.getElement()?.querySelector('.leaflet-popup-close-button');
        closeButton?.setAttribute('aria-label', text.close);
        closeButton?.setAttribute('title', text.close);
      });
      marker.addTo(markers);

      const pin = marker.getElement();
      pin?.setAttribute('aria-label', shelter.name);
      pin?.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        event.stopPropagation();
        marker.openPopup();
        showShelter.focus({ preventScroll: true });
      });

      popup.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        event.stopPropagation();
        marker.closePopup();
        pin?.focus({ preventScroll: true });
      });
      showShelter.addEventListener('click', () => {
        marker.closePopup();
        onShowShelter(shelter.id);
      });
    }

    return () => { markers.remove(); };
  }, [points, text, onShowShelter]);

  return (
    <section className="shelter-map" aria-label={text.map}>
      <div ref={hostRef} className="shelter-map-host" />
      {points.length === 0 && <p className="shelter-map-message" role="status">{text.empty}</p>}
    </section>
  );
}
