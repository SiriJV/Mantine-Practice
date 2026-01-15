import { Router } from 'express';
import { db } from '../db';

const router = Router();

/**
 * GET /tags
 * Hämta alla taggar
 */
router.get('/', async (req, res) => {
  try {
    const [tags] = await db.query('SELECT * FROM tags ORDER BY id');
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunde inte hämta taggar' });
  }
});

export default router;
