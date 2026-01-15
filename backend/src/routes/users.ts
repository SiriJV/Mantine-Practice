import { Router } from 'express';
import { db } from '../db';

const router = Router();

/**
 * GET /users
 * Hämta alla users (basic info)
 */
router.get('/', async (_req, res) => {
  try {
    const [users] = await db.query(`
      SELECT id, name, alias, bio, profile_picture_url
      FROM users
      ORDER BY alias ASC
    `);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta users' });
  }
});

/**
 * GET /users/:id
 * Hämta user-profil + counts för followers, following, tags och cities
 */
router.get('/:id', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const [[user]]: any = await db.query(
      'SELECT id, name, alias, bio, profile_picture_url, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User hittades inte' });
    }

    const [[followers]]: any = await db.query(
      'SELECT COUNT(*) AS count FROM user_follows WHERE following_id = ?',
      [userId]
    );

    const [[following]]: any = await db.query(
      'SELECT COUNT(*) AS count FROM user_follows WHERE follower_id = ?',
      [userId]
    );

    const [[followedTags]]: any = await db.query(
      'SELECT COUNT(*) AS count FROM user_followed_tags WHERE user_id = ?',
      [userId]
    );

    const [[followedCities]]: any = await db.query(
      'SELECT COUNT(*) AS count FROM user_followed_cities WHERE user_id = ?',
      [userId]
    );

    res.json({
      ...user,
      followers_count: followers.count,
      following_count: following.count,
      followed_tags_count: followedTags.count,
      followed_cities_count: followedCities.count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta user' });
  }
});

/**
 * GET /users/:id/followers
 * Lista användare som följer denna user
 */
router.get('/:id/followers', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const [rows] = await db.query(`
      SELECT u.id, u.name, u.alias, u.profile_picture_url
      FROM users u
      JOIN user_follows uf ON u.id = uf.follower_id
      WHERE uf.following_id = ?
      ORDER BY u.alias ASC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta followers' });
  }
});

/**
 * GET /users/:id/following
 * Lista användare som denna user följer
 */
router.get('/:id/following', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const [rows] = await db.query(`
      SELECT u.id, u.name, u.alias, u.profile_picture_url
      FROM users u
      JOIN user_follows uf ON u.id = uf.following_id
      WHERE uf.follower_id = ?
      ORDER BY u.alias ASC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta following' });
  }
});

/**
 * GET /users/:id/tags
 * Lista taggar användaren följer
 */
router.get('/:id/tags', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const [rows] = await db.query(`
      SELECT t.id, t.name
      FROM tags t
      JOIN user_followed_tags uft ON t.id = uft.tag_id
      WHERE uft.user_id = ?
      ORDER BY t.name ASC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta följda taggar' });
  }
});

/**
 * GET /users/:id/cities
 * Lista städer användaren följer
 */
router.get('/:id/cities', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const [rows] = await db.query(`
      SELECT c.id, c.name, c.region
      FROM cities c
      JOIN user_followed_cities ufc ON c.id = ufc.city_id
      WHERE ufc.user_id = ?
      ORDER BY c.name ASC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta följda städer' });
  }
});

/**
 * GET /users/:id/events
 * Events användaren deltar i
 */
router.get('/:id/events', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const [rows] = await db.query(`
      SELECT e.*, r.name AS restaurant_name
      FROM events e
      JOIN user_events_participating uep ON e.id = uep.event_id
      JOIN restaurants r ON e.restaurant_id = r.id
      WHERE uep.user_id = ?
      ORDER BY e.start_datetime ASC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta events' });
  }
});

export default router;