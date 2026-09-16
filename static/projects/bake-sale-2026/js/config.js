// The only file an organizer edits in code. Everything else lives in the sheet.
export const EVENT = {
  title: 'Little Founders Bake Sale',
  emoji: '🍪',
  kicker: 'our neighborhood · Coronation Park',
  when: 'Saturday, Sep 26 · 5–7pm',
  whereLabel: 'Coronation Park',
  whereUrl: 'https://maps.app.goo.gl/X55HugmgNXMWQa4c8',
  why: 'Kids learning entrepreneurship',
  foundersHeading: 'Meet our founders',
};

// Published-CSV endpoint for the responses sheet.
// For OFFLINE local dev, set this to './sample-data.csv' and serve with a local http server.
export const CSV_URL =
  'https://docs.google.com/spreadsheets/d/1eCOFn86cwhnyo7JK0y5NQ_q3VfuK3rA_JmT3PXDYoxE/gviz/tq?tqx=out:csv';

// Maps founder fields -> exact sheet header names. Change here if you rename a form question.
export const COLUMNS = {
  name: "Kid's name",
  age: 'Age',
  item: "What they're selling",
  price: 'Price',
  productPhoto: 'Product photo',
  flyer: 'Flyer',
  streets: "Streets they're marketing to",
  customer: "Who's their customer",
  pricingLogic: 'Why did they pick this price',
  estimate: 'Sales estimate',
  approved: 'Approved',
  actualSales: 'Actual sales',
};
