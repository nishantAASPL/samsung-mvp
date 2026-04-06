const regions = ['Northeast', 'Midwest', 'South', 'West'];
const pList   = ['TechServ Corp', 'Pacific Repair Group', 'MidWest Alliance'];

function generateStoreHealth() {
  const data = [];
  for (let i = 1; i <= 22; i++) {
    const sStock = Math.floor((i * 7919 + 3) % 25);
    const sSafe  = Math.floor((i * 3571 + 5) % 10) + 5;
    const bStock = Math.floor((i * 6271 + 11) % 40);
    const bSafe  = Math.floor((i * 2311 + 7) % 15) + 5;
    const lStock = Math.floor((i * 4973 + 13) % 10);
    const lSafe  = Math.floor((i * 1777 + 3) % 4) + 2;

    let status = 'Healthy';
    if (sStock === 0 || bStock === 0 || lStock === 0 || sStock < sSafe * 0.5 || bStock < bSafe * 0.5)
      status = 'Critical';
    else if (sStock < sSafe || bStock < bSafe || lStock < lSafe)
      status = 'At Risk';

    data.push({
      id:      `Store #${100 + i * 7}`,
      partner: pList[i % 3],
      location:`City ${i}, ${regions[i % 4]}`,
      region:  regions[i % 4],
      screen:  { stock: sStock, safe: sSafe },
      battery: { stock: bStock, safe: bSafe },
      logic:   { stock: lStock, safe: lSafe },
      status,
    });
  }

  // Pin the key demo stores
  data[0] = { ...data[0], id: 'Store #142', location: 'Chicago, IL',    region: 'Midwest',   screen: { stock: 0, safe: 5 },  status: 'Critical' };
  data[1] = { ...data[1], id: 'Store #045', location: 'New York, NY',   region: 'Northeast', screen: { stock: 2, safe: 8 },  status: 'Critical' };
  data[2] = { ...data[2], id: 'Store #187', location: 'Naperville, IL', region: 'Midwest',   screen: { stock: 14, safe: 4 }, status: 'Healthy' };

  return data.sort((a, b) => (a.status === 'Critical' ? -1 : b.status === 'Critical' ? 1 : 0));
}

export const storeHealthData = generateStoreHealth();
