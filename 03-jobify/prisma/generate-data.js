const fs = require('fs');
const path = require('path');

// Function to generate a random date within the last six months
function generateRandomDate() {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 6);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Function to format the date in the desired format
function formatDate(date) {
  return date.toISOString();
}

// Path to the mock-data.json file
const filePath = path.join(__dirname, 'mock-data.json');

// Read the mock data file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON data
  let list = JSON.parse(data);

  // Generate new list with updated createdAt dates
  const newList = list.map((item) => ({
    ...item,
    createdAt: formatDate(generateRandomDate()),
  }));

  // Output the new list
  console.log(newList);

  // Optionally, write the new list to a file
  fs.writeFile(
    path.join(__dirname, 'mock-data.json'),
    JSON.stringify(newList, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Updated mock data file has been written successfully');
      }
    }
  );
});
