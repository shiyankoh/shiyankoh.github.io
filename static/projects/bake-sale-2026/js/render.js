import { escapeHtml, escapeAttr } from './images.js';

const KUEH = ['#2fb0a6', '#e05a72', '#e8b04b', '#3fa34d', '#7b4a2b'];

const ROSETTE_TILE =
  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
  '<rect width="100" height="100" fill="#f7f0dd"/>' +
  '<circle cx="0" cy="0" r="30" fill="#2fb0a6"/><circle cx="100" cy="0" r="30" fill="#2fb0a6"/>' +
  '<circle cx="0" cy="100" r="30" fill="#2fb0a6"/><circle cx="100" cy="100" r="30" fill="#2fb0a6"/>' +
  '<circle cx="0" cy="0" r="12" fill="#e8b04b"/><circle cx="100" cy="0" r="12" fill="#e8b04b"/>' +
  '<circle cx="0" cy="100" r="12" fill="#e8b04b"/><circle cx="100" cy="100" r="12" fill="#e8b04b"/>' +
  '<g transform="translate(50,50)" fill="#e05a72">' +
  '<ellipse cx="0" cy="-17" rx="6" ry="15"/><ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(45)"/>' +
  '<ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(90)"/><ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(135)"/>' +
  '<ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(180)"/><ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(225)"/>' +
  '<ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(270)"/><ellipse cx="0" cy="-17" rx="6" ry="15" transform="rotate(315)"/>' +
  '</g><circle cx="50" cy="50" r="9" fill="#e8b04b"/><circle cx="50" cy="50" r="4" fill="#3f6d49"/></svg>';

export function rosetteBorderSVG(viewportWidth = 1000, tile = 30) {
  const count = Math.ceil(viewportWidth / tile) + 2;
  return `<div class="rosette-border">${ROSETTE_TILE.repeat(count)}</div>`;
}

export function imageWithFallback(url, alt, initial, colorIndex = 0) {
  const bg = KUEH[colorIndex % KUEH.length];
  const safeInitial = escapeHtml(initial || '?');
  const placeholder =
    `<div class="img-fallback" style="background:${bg}">${safeInitial}</div>`;
  if (!url) return placeholder;
  // On load error, swap the <img> for the placeholder markup.
  const onerr = escapeAttr(
    `this.onerror=null;this.outerHTML=${JSON.stringify(placeholder)}`
  );
  return `<img class="photo" src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy" onerror="${onerr}">`;
}

function panel(label, bodyHtml) {
  return `<div class="panel"><div class="label">${label}</div>${bodyHtml}</div>`;
}

// ---- Coverage map ----------------------------------------------------------

function pinRow(kids, cx, cy, orient) {
  const shown = kids.slice(0, 3);
  const extra = kids.length - shown.length;
  const place = (i, total) => {
    const off = (i - (total - 1) / 2) * 20;
    return orient === 'h' ? { x: cx + off, y: cy } : { x: cx, y: cy + off };
  };
  const total = shown.length + (extra > 0 ? 1 : 0);
  let out = '';
  shown.forEach((k, i) => {
    const { x, y } = place(i, total);
    const color = KUEH[k.colorIndex % KUEH.length];
    out += `<circle cx="${x}" cy="${y}" r="9" fill="${color}" stroke="#fff" stroke-width="2"/>`
      + `<text x="${x}" y="${y + 3.5}" font-size="10" fill="#fff" text-anchor="middle" font-weight="700">${escapeHtml(k.initial)}</text>`;
  });
  if (extra > 0) {
    const { x, y } = place(shown.length, total);
    out += `<circle cx="${x}" cy="${y}" r="9" fill="#7b4a2b" stroke="#fff" stroke-width="2"/>`
      + `<text x="${x}" y="${y + 3}" font-size="9" fill="#fff" text-anchor="middle">+${extra}</text>`;
  }
  return out;
}

function streetLine(s, x1, y1, x2, y2, orient, coord) {
  const stroke = s.covered ? '#3fa34d' : '#c3bca8';
  const dash = s.covered ? '' : ' stroke-dasharray="3 8"';
  const width = s.covered ? 7 : 5;
  const line = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"${dash}/>`;
  const labelColor = s.covered ? '#2c6e40' : '#8a7a52';
  const label = escapeHtml(s.label);
  let text = '';
  let pins = '';
  if (orient === 'h') {
    text = `<text x="34" y="${coord - 7}" font-size="11" fill="${labelColor}" font-weight="700">${label}</text>`;
    if (s.covered) pins = pinRow(s.kids, 200, coord, 'h');
  } else {
    text = `<text transform="translate(${coord + 5},214) rotate(-90)" font-size="11" fill="${labelColor}" font-weight="700">${label}</text>`;
    if (s.covered) pins = pinRow(s.kids, coord, 130, 'v');
  }
  return line + text + pins;
}

function coverageSvg(list) {
  const W = 380, H = 250;
  const horis = [];
  const verts = [];
  list.forEach((s, i) => (i % 2 === 0 ? horis : verts).push(s));
  const parts = [`<rect width="${W}" height="${H}" fill="#f7f0dd"/>`];
  // decorative park marker (top-right, clear of the street labels)
  parts.push('<ellipse cx="330" cy="30" rx="40" ry="20" fill="#cfe8cf"/>'
    + '<text x="330" y="34" font-size="10" fill="#3f6d54" text-anchor="middle" font-weight="700">Coronation Pk</text>');

  const yTop = 60, yBot = 215, xLeft = 28, xRight = 352;
  horis.forEach((s, k) => {
    const y = horis.length > 1 ? Math.round(yTop + k * (yBot - yTop) / (horis.length - 1)) : Math.round((yTop + yBot) / 2);
    parts.push(streetLine(s, xLeft, y, xRight, y, 'h', y));
  });
  const xA = 80, xB = 300;
  verts.forEach((s, j) => {
    const x = verts.length > 1 ? Math.round(xA + j * (xB - xA) / (verts.length - 1)) : Math.round((xA + xB) / 2);
    parts.push(streetLine(s, x, 48, x, 226, 'v', x));
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="'Nunito',sans-serif">${parts.join('')}</svg>`;
}

export function renderCoverageMap(coverage) {
  if (!coverage || !coverage.streets || coverage.streets.length === 0) return '';
  const open = coverage.streets.filter(s => !s.covered).map(s => escapeHtml(s.label));
  const openLine = open.length
    ? `<p class="cov-open"><b>Still open:</b> ${open.join(', ')}</p>`
    : `<p class="cov-open">Every street's got a founder on it! 🎉</p>`;
  return `
    <section class="coverage">
      <h2 class="sec-title">🗺️ Street coverage</h2>
      <p class="cov-count"><b>${coverage.coveredCount}</b> of <b>${coverage.total}</b> streets have a founder on them</p>
      <div class="cov-map">${coverageSvg(coverage.streets)}</div>
      <div class="cov-legend"><span><i class="c-cov"></i> covered</span><span><i class="c-open"></i> still open</span></div>
      ${openLine}
    </section>`;
}

export function renderHome(event, founders, coverage) {
  const cards = founders.map(f => `
    <button class="kcard" data-founder="${escapeAttr(f.id)}" style="--accent:${KUEH[f.colorIndex % KUEH.length]}">
      <div class="kcard-photo">${imageWithFallback(f.productPhoto, `${f.name}'s ${f.item}`, f.name.charAt(0), f.colorIndex)}</div>
      <h4>${escapeHtml(f.name)}</h4>
      <p class="sells">${escapeHtml(f.item)}</p>
      ${f.price ? `<span class="price">${escapeHtml(f.price)}</span>` : ''}
    </button>`).join('');

  const grid = founders.length
    ? `<div class="grid">${cards}</div>`
    : `<p class="empty">Our founders are getting ready — check back soon! 🍪</p>`;

  return `
    <div class="hero">
      <div class="kicker">${escapeHtml(event.kicker)}</div>
      <h1>${escapeHtml(event.title)} ${event.emoji}</h1>
      <div class="meta">
        <div><b>When</b>${escapeHtml(event.when)}</div>
        <div><b>Where</b><a href="${escapeAttr(event.whereUrl)}" target="_blank" rel="noopener">${escapeHtml(event.whereLabel)} ↗</a></div>
        <div><b>Why</b>${escapeHtml(event.why)}</div>
      </div>
    </div>
    <h2 class="sec-title">${escapeHtml(event.foundersHeading)} 👇</h2>
    ${grid}
    ${coverage ? renderCoverageMap(coverage) : ''}`;
}

export function renderFounder(f) {
  const streets = f.streets.length
    ? `<div class="streets">${f.streets.map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>`
    : `<p class="muted">—</p>`;

  const actual = f.actualSales
    ? panel('📊 Actual sales', `<p class="est">${escapeHtml(f.actualSales)}</p>`)
    : '';

  return `
    <button class="back" data-nav="home">← back to all founders</button>
    <div class="khead" style="--accent:${KUEH[f.colorIndex % KUEH.length]}">
      <div class="khead-photo">${imageWithFallback(f.productPhoto, `${f.name}'s ${f.item}`, f.name.charAt(0), f.colorIndex)}</div>
      <div>
        <h1>${escapeHtml(f.name)}${f.age ? `, age ${escapeHtml(f.age)}` : ''}</h1>
        <p class="sub">Selling: <b>${escapeHtml(f.item)}</b>${f.price ? ` · ${escapeHtml(f.price)}` : ''}</p>
      </div>
    </div>
    <div class="detail-grid">
      ${panel('🎨 Their flyer', `<div class="flyer-box">${imageWithFallback(f.flyer, `${f.name}'s flyer`, '🎨', f.colorIndex)}</div>`)}
      ${panel('🚲 Streets they\'re marketing to', streets)}
      ${panel('🎯 Who\'s their customer?', `<p>${escapeHtml(f.customer) || '—'}</p>`)}
      ${panel('💰 Why they priced it this way', `<p>${escapeHtml(f.pricingLogic) || '—'}</p>`)}
      ${panel('📈 Their sales estimate', `<p class="est">${escapeHtml(f.estimate) || '—'}</p>`)}
      ${actual}
    </div>`;
}
