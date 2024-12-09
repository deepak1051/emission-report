import fs from 'fs';

const generateMockData = () => {
  const mockData = [];
  for (let i = 1; i <= 10000; i++) {
    mockData.push({
      id: i,
      description: `Description ${i}`,
      scope: `Scope ${i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1}`,
      emission: (Math.random() * 1000).toFixed(2),
      date: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.ceil(Math.random() * 28)
      )
        .toISOString()
        .split('T')[0],
    });
  }
  return mockData;
};

// Generate data
const data = generateMockData();

// Create the data.js file content
const fileContent = `export const mockData = ${JSON.stringify(data, null, 2)};`;

// Write the file
fs.writeFile('data.js', fileContent, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('data.js file has been created with 10,000 rows of mock data.');
  }
});
