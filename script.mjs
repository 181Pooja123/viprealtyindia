// const PLACE_ID = 'ChIJH-dhUwDdDDkRwzGBMy7L58U'; // replace with actual place ID
// const API_KEY = 'AIzaSyAWlDs31D98k3J-tK6_GeSHCPRx8MFSV-M';   // replace with actual API key

// const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;

// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log("Full response from API:\n", JSON.stringify(data, null, 2)); // Log everything for debugging

//     if (data.result && data.result.reviews) {
//       console.log("\nGoogle Reviews:");
//       data.result.reviews.forEach((review, index) => {
//         console.log(`\nReview ${index + 1}`);
//         console.log(`Author: ${review.author_name}`);
//         console.log(`Rating: ${review.rating}`);
//         console.log(`Comment: ${review.text}`);
//       });
//     } else {
//       console.log("No reviews found or 'result' is undefined.");
//     }
//   })
//   .catch(err => {
//     console.error("Error fetching reviews:", err);
//   });
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

// Replace with your actual values
const PLACE_ID = 'ChIJH-dhUwDdDDkRwzGBMy7L58U';
const API_KEY = 'AIzaSyAWlDs31D98k3J-tK6_GeSHCPRx8MFSV-M';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'rv.html'));
});

// API route to fetch reviews
app.get('/api/reviews', async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result && data.result.reviews) {
      res.json(data.result.reviews);
    } else {
      res.status(404).json({ message: 'No reviews found' });
    }
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});






