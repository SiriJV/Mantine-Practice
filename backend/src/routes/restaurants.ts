import { Router } from 'express';
import { db } from '../db';

const router = Router();

/**
 * GET /restaurants
 * kan också köra: ?city=stockholm
 */
router.get('/', async (req, res) => {
  const city = req.query.city as string | undefined;

  let sql = `SELECT * FROM restaurants`;
  const params: any[] = [];

  if (city) {
    sql += ` WHERE LOWER(city) = LOWER(?)`;
    params.push(city);
  }

  try {
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid hämtning av restauranger' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [rows] = await db.query(`SELECT * FROM restaurants WHERE id = ?`, [id]);

    const restaurant = (rows as any[])[0];
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurang hittades inte' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid hämtning av restaurang' });
  }
});

router.get('/:id/events', async (req, res) => {
  const restaurantId = Number(req.params.id);

  try {
    const [events] = await db.query(
      `
      SELECT *
      FROM events
      WHERE restaurant_id = ?
      AND start_datetime > NOW()
      ORDER BY start_datetime ASC
      `,
      [restaurantId]
    );

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid hämtning av events' });
  }
});


export default router;
