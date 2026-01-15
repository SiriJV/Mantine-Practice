import { seedCategories } from './seedCategories';
import { seedTags } from './seedTags';
import { seedRestaurants } from './seedRestaurants';
import { seedEvents } from './seedEvents';
import { db } from '../db';

async function dropTables() {
  await db.query('DROP TABLE IF EXISTS user_followed_tags');
  await db.query('DROP TABLE IF EXISTS user_events_saved');
  await db.query('DROP TABLE IF EXISTS user_events_participating');
  await db.query('DROP TABLE IF EXISTS event_tags');
  await db.query('DROP TABLE IF EXISTS events');
  await db.query('DROP TABLE IF EXISTS tags');       // Drop tags before categories
  await db.query('DROP TABLE IF EXISTS restaurants');
  await db.query('DROP TABLE IF EXISTS categories'); 
}

async function seedAll() {
  try {
    await dropTables();

    console.log('Seeding categories...');
    await seedCategories();

    console.log('Seeding tags...');
    await seedTags();

    console.log('Seeding restaurants...');
    await seedRestaurants();

    console.log('Seeding events...');
    await seedEvents();

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seedAll();
