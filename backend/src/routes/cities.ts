import { Router } from 'express';
import { db } from '../db';

const router = Router();

/**
 * GET /cities
 * Hämta alla städer, eller filtrera på söksträng i namn (query param "q")
 * Exempel: /cities?q=stock
 */
router.get('/', async (req, res) => {
  const q = (req.query.q as string | undefined)?.toLowerCase();

  let sql = 'SELECT * FROM cities';
  const params: any[] = [];

  if (q) {
    sql += ' WHERE LOWER(name) LIKE ?';
    params.push(`${q}%`);
  }

  sql += ' ORDER BY id';

  try {
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta städer' });
  }
});

/**
 * GET /cities/region/:region
 * Hämta alla städer som tillhör en viss region
 * Exempel: /cities/region/Skåne län
 */
router.get('/region/:region', async (req, res) => {
  const region = req.params.region;

  try {
    const [rows] = await db.query(
      'SELECT * FROM cities WHERE region = ? ORDER BY name ASC',
      [region]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta städer för regionen' });
  }
});

export default router;