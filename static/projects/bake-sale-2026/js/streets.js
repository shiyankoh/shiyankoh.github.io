// Match free-text street entries from the sheet against the canonical
// neighborhood street list, and compute per-street coverage.

const ORDINALS = {
  first: '1', '1st': '1', second: '2', '2nd': '2', third: '3', '3rd': '3',
  fourth: '4', '4th': '4', fifth: '5', '5th': '5', sixth: '6', '6th': '6',
  seventh: '7', '7th': '7', eighth: '8', '8th': '8', ninth: '9', '9th': '9', tenth: '10', '10th': '10',
};
const ABBR = {
  ave: 'avenue', av: 'avenue', rd: 'road', st: 'street', dr: 'drive', drv: 'drive',
  ln: 'lane', cl: 'close', cres: 'crescent', blvd: 'boulevard', jln: 'jalan',
};

// Lowercase, strip punctuation, expand ordinals ("6th"->"6") and abbreviations
// ("Ave"->"avenue", "Jln"->"jalan"), collapse whitespace.
export function normalizeStreet(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(w => ORDINALS[w] || ABBR[w] || w)
    .join(' ')
    .trim();
}

// Map one free-text entry to at most one canonical street.
// Exact (normalized) match wins — this keeps "Coronation Road" and
// "Coronation Road West" distinct. Otherwise, if the entry contains a canonical
// name (e.g. "along coronation road west"), pick the LONGEST such canonical.
export function matchCanonical(entry, streets) {
  const nE = normalizeStreet(entry);
  if (!nE) return null;
  const norm = streets.map(label => ({ label, n: normalizeStreet(label) }));
  const exact = norm.find(c => c.n && c.n === nE);
  if (exact) return exact.label;
  const contained = norm.filter(c => c.n && nE.includes(c.n));
  if (contained.length) {
    contained.sort((a, b) => b.n.length - a.n.length);
    return contained[0].label;
  }
  return null;
}

// For each canonical street, collect the founders marketing to it.
// Returns { streets: [{label, covered, kids:[{name,initial,colorIndex}]}], coveredCount, total }.
export function computeCoverage(founders, streets) {
  const byLabel = new Map(streets.map(label => [label, []]));
  for (const f of founders) {
    const seen = new Set();
    for (const entry of (f.streets || [])) {
      const label = matchCanonical(entry, streets);
      if (label && !seen.has(label)) {
        seen.add(label);
        byLabel.get(label).push({
          name: f.name,
          initial: (f.name || '?').charAt(0).toUpperCase(),
          colorIndex: f.colorIndex || 0,
        });
      }
    }
  }
  const list = streets.map(label => {
    const kids = byLabel.get(label);
    return { label, covered: kids.length > 0, kids };
  });
  return { streets: list, coveredCount: list.filter(s => s.covered).length, total: streets.length };
}
