import { driveImageUrl } from './images.js';

export function slugify(name, index) {
  const base = String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${base || 'founder'}-${index}`;
}

// If the Approved column is absent from the row, show everything.
// If present, only truthy values (yes/true/1/checkmark/x) pass; blank = hidden.
export function isApproved(obj, approvedHeader) {
  if (!(approvedHeader in obj)) return true;
  const v = String(obj[approvedHeader] || '').trim().toLowerCase();
  if (v === '') return false;
  return ['yes', 'y', 'true', '1', '✓', 'x', 'approved'].includes(v);
}

export function normalizeFounders(objects, cols) {
  return objects
    .filter(o => String(o[cols.name] || '').trim() !== '')
    .filter(o => isApproved(o, cols.approved))
    .map((o, index) => ({
      id: slugify(o[cols.name], index),
      name: String(o[cols.name] || '').trim(),
      age: String(o[cols.age] || '').trim(),
      item: String(o[cols.item] || '').trim(),
      price: String(o[cols.price] || '').trim(),
      productPhoto: driveImageUrl(o[cols.productPhoto]),
      flyer: driveImageUrl(o[cols.flyer]),
      streets: String(o[cols.streets] || '').split(',').map(s => s.trim()).filter(Boolean),
      customer: String(o[cols.customer] || '').trim(),
      pricingLogic: String(o[cols.pricingLogic] || '').trim(),
      estimate: String(o[cols.estimate] || '').trim(),
      actualSales: String(o[cols.actualSales] || '').trim(),
      colorIndex: index % 5,
    }));
}
