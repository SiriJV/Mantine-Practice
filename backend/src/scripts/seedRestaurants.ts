import { db } from '../db';

export async function seedRestaurants() {

  await db.query(`
    CREATE TABLE restaurants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      city VARCHAR(100),
      latitude DECIMAL(9,6),
      longitude DECIMAL(9,6),
      opening_hours TEXT,
      menu_url VARCHAR(255),
      website_url VARCHAR(255)
    );
  `);

  await db.query(`
    INSERT INTO restaurants (name, address, city, latitude, longitude, opening_hours, menu_url, website_url) VALUES
      ('Café Español', 'Hornsgatan 12', 'Stockholm', 59.3175, 18.0560, 'Mån–Fre 10–22, Lör–Sön 12–23', NULL, 'https://cafeespanol.example'),
      ('La Trattoria', 'Stora Torget 5', 'Uppsala', 59.8586, 17.6389, 'Alla dagar 11–23', 'https://latrattoria.example/menu', 'https://latrattoria.example'),
      ('Restaurang Solsken', 'Södra Vägen 10', 'Göteborg', 57.7089, 11.9746, 'Mån–Fre 11–21', NULL, 'https://solsken.example'),
      ('Bistro Nord', 'Norrmalmstorg 2', 'Stockholm', 59.3346, 18.0632, 'Alla dagar 10–22', 'https://bistronord.example/menu', 'https://bistronord.example'),
      ('Pizzahörnan', 'Kungsgatan 5', 'Malmö', 55.6050, 13.0000, 'Mån–Sön 11–23', NULL, 'https://pizzahornan.example'),
      ('Café Blå', 'Lilla Torg 7', 'Malmö', 55.6055, 13.0005, 'Mån–Fre 09–20', NULL, 'https://cafebla.example'),
      ('Italienska Delikatesser', 'Drottninggatan 14', 'Stockholm', 59.3325, 18.0649, 'Mån–Sön 11–22', 'https://italienskadelikatesser.example/menu', 'https://italienskadelikatesser.example'),
      ('Gröna Krogen', 'Vasagatan 22', 'Uppsala', 59.8589, 17.6400, 'Mån–Fre 10–22', NULL, 'https://gronakrogen.example'),
      ('Matboden', 'Storgatan 30', 'Göteborg', 57.7090, 11.9730, 'Alla dagar 09–21', NULL, 'https://matboden.example'),
      ('Sushi Central', 'Östra Hamngatan 12', 'Göteborg', 57.7080, 11.9740, 'Mån–Sön 11–22', 'https://sushicentral.example/menu', 'https://sushicentral.example');
  `);
}