import { EVENT, CSV_URL, COLUMNS, STREETS } from './config.js';
import { csvToObjects } from './csv.js';
import { normalizeFounders } from './founders.js';
import { computeCoverage } from './streets.js';
import { rosetteBorderSVG, renderHome, renderFounder } from './render.js';
import { initCoverageMap, destroyCoverageMap } from './covmap.js';

const rosetteEl = document.getElementById('rosette');
const appEl = document.getElementById('app');
let founders = [];
let streetsGeo = null;

function paintRosette() { rosetteEl.innerHTML = rosetteBorderSVG(window.innerWidth); }

function currentFounderId() {
  return new URLSearchParams(window.location.search).get('founder');
}

function route() {
  const id = currentFounderId();
  const founder = id ? founders.find(f => f.id === id) : null;
  const coverage = computeCoverage(founders, STREETS);
  destroyCoverageMap();
  appEl.innerHTML = founder ? renderFounder(founder) : renderHome(EVENT, founders, coverage);
  if (!founder && streetsGeo) initCoverageMap('cov-map', streetsGeo, coverage, STREETS);
  window.scrollTo(0, 0);
}

function go(id) {
  const url = new URL(window.location);
  if (id) url.searchParams.set('founder', id); else url.searchParams.delete('founder');
  history.pushState({}, '', url);
  route();
}

// Event delegation: cards navigate to a founder, back link returns home.
appEl.addEventListener('click', (e) => {
  const card = e.target.closest('[data-founder]');
  if (card) { go(card.getAttribute('data-founder')); return; }
  if (e.target.closest('[data-nav="home"]')) { go(null); }
});
window.addEventListener('popstate', route);
window.addEventListener('resize', paintRosette);

async function init() {
  paintRosette();
  // Street geometry is static; load it in parallel. If it fails, the map is
  // simply skipped — the rest of the page is unaffected.
  const geoPromise = fetch('./streets.geojson')
    .then(r => (r.ok ? r.json() : null))
    .catch(() => null);
  try {
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    founders = normalizeFounders(csvToObjects(text), COLUMNS);
    streetsGeo = await geoPromise;
    route();
  } catch (err) {
    // Event details still render from config even if the sheet fails.
    streetsGeo = await geoPromise;
    const coverage = computeCoverage([], STREETS);
    destroyCoverageMap();
    appEl.innerHTML = renderHome(EVENT, [], coverage) +
      `<p class="error">Couldn't load the founders right now. Please refresh in a moment.</p>`;
    if (streetsGeo) initCoverageMap('cov-map', streetsGeo, coverage, STREETS);
    console.error('Failed to load CSV:', err);
  }
}

init();
