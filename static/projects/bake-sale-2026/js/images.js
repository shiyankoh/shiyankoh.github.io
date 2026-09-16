// Convert a value from the sheet into a displayable image URL.
// - empty/whitespace -> '' (caller shows a placeholder)
// - non-Drive URL    -> returned unchanged (e.g. Unsplash test images)
// - Google Drive link -> https://drive.google.com/thumbnail?id=<ID>&sz=w1000
export function driveImageUrl(link) {
  if (!link) return '';
  const s = String(link).trim();
  if (s === '') return '';
  if (!s.includes('drive.google.com')) return s;
  let id = '';
  let m = s.match(/\/file\/d\/([A-Za-z0-9_-]+)/);
  if (m) id = m[1];
  if (!id) { m = s.match(/[?&]id=([A-Za-z0-9_-]+)/); if (m) id = m[1]; }
  if (!id) return s; // unknown Drive format — better to try the original than nothing
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
