
import db from './db.js'; 

async function fetchProducts() {
  try {
    // Ek sample query chalakar dekhte hain
    const [rows] = await db.query('SELECT * FROM products');
    
    console.log('Database connected via ES Modules!');
    console.log('Products:', rows);
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

fetchProducts();