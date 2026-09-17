// Renders the street-coverage map with Leaflet (loaded globally as `L` from a
// CDN) + soft CartoDB tiles + prebaked OSM street geometry (streets.geojson).
// Street shapes are static; coverage colors come live from the sheet.
import { matchCanonical } from './streets.js';

const KUEH = ['#2fb0a6', '#e05a72', '#e8b04b', '#3fa34d', '#7b4a2b'];
const COVERED = '#2f9e44';
const OPEN = '#b9b09a';

let mapInstance = null;

// Tear down any previous map (the app re-renders the home view on navigation).
export function destroyCoverageMap() {
  if (mapInstance) { mapInstance.remove(); mapInstance = null; }
}

export function initCoverageMap(elId, geojson, coverage, streets) {
  const el = document.getElementById(elId);
  if (!el || typeof L === 'undefined' || !geojson || !geojson.features) return;
  destroyCoverageMap();

  const covByLabel = new Map(coverage.streets.map(s => [s.label, s]));
  const isCovered = (name) => {
    const label = matchCanonical(name || '', streets);
    const s = label && covByLabel.get(label);
    return { label, covered: !!(s && s.covered) };
  };

  const map = L.map(el, { scrollWheelZoom: false, zoomControl: true });
  mapInstance = map;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  const layer = L.geoJSON(geojson, {
    style: (feature) => {
      const { covered } = isCovered(feature.properties && feature.properties.name);
      return covered
        ? { color: COVERED, weight: 6, opacity: 0.95, lineCap: 'round' }
        : { color: OPEN, weight: 4, opacity: 0.85, dashArray: '2 9', lineCap: 'round' };
    },
    onEachFeature: (feature, lyr) => {
      const { label, covered } = isCovered(feature.properties && feature.properties.name);
      if (!label) return;
      const s = covByLabel.get(label);
      const who = covered && s.kids.length ? ` — ${s.kids.map(k => k.name).join(', ')}` : ' — still open';
      lyr.bindTooltip(`${label}${who}`, { sticky: true });
    },
  }).addTo(map);

  try { map.fitBounds(layer.getBounds(), { padding: [24, 24] }); }
  catch (_e) { map.setView([1.3233, 103.797], 15); }

  // One kid-initial pin per covered street, at the midpoint of its longest segment.
  for (const s of coverage.streets) {
    if (!s.covered || !s.kids.length) continue;
    const pt = representativePoint(geojson, s.label, streets);
    if (!pt) continue;
    const initials = s.kids.slice(0, 3).map(k => k.initial).join('');
    const extra = s.kids.length > 3 ? '+' : '';
    const color = KUEH[(s.kids[0].colorIndex || 0) % KUEH.length];
    const icon = L.divIcon({
      className: 'cov-pin',
      html: `<span style="background:${color}">${initials}${extra}</span>`,
      iconSize: [28, 28], iconAnchor: [14, 14],
    });
    L.marker(pt, { icon, title: `${s.label}: ${s.kids.map(k => k.name).join(', ')}` }).addTo(map);
  }
}

function representativePoint(geojson, label, streets) {
  let best = null;
  for (const f of geojson.features) {
    if (matchCanonical(f.properties && f.properties.name, streets) !== label) continue;
    const coords = f.geometry && f.geometry.type === 'LineString' ? f.geometry.coordinates : [];
    if (coords.length >= 2 && (!best || coords.length > best.length)) best = coords;
  }
  if (!best) return null;
  const mid = best[Math.floor(best.length / 2)];
  return [mid[1], mid[0]]; // GeoJSON [lng,lat] -> Leaflet [lat,lng]
}
