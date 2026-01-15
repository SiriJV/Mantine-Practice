import { db } from '../db';

async function seed() {
  await db.query(`DROP TABLE IF EXISTS user_followed_cities;`);
  await db.query(`DROP TABLE IF EXISTS user_followed_tags;`);
  await db.query(`DROP TABLE IF EXISTS user_follows;`);
  await db.query(`DROP TABLE IF EXISTS user_events_participating;`);
  await db.query(`DROP TABLE IF EXISTS user_events_saved;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

  await db.query(`
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      alias VARCHAR(50) NOT NULL UNIQUE,
      bio TEXT,
      profile_picture_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE user_follows (
      follower_id INT NOT NULL,
      following_id INT NOT NULL,
      PRIMARY KEY (follower_id, following_id),
      FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.query(`
    CREATE TABLE user_followed_tags (
      user_id INT NOT NULL,
      tag_id INT NOT NULL,
      PRIMARY KEY (user_id, tag_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
  `);

  await db.query(`
    CREATE TABLE user_followed_cities (
      user_id INT NOT NULL,
      city_id INT NOT NULL,
      PRIMARY KEY (user_id, city_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
    );
  `);

  await db.query(`
    CREATE TABLE user_events_saved (
      user_id INT NOT NULL,
      event_id INT NOT NULL,
      PRIMARY KEY (user_id, event_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );
  `);

  await db.query(`
    CREATE TABLE user_events_participating (
      user_id INT NOT NULL,
      event_id INT NOT NULL,
      PRIMARY KEY (user_id, event_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );
  `);

  await db.query(`
    INSERT INTO users (name, alias, bio, profile_picture_url) VALUES
      ('Anna Svensson', 'anna_s', 'Älskar språk och god mat', 'https://example.com/profiles/anna.jpg'),
      ('Erik Karlsson', 'erik_k', 'Vin, ost och trevliga samtal', 'https://example.com/profiles/erik.jpg'),
      ('Sara Lind', 'saral', 'Pluggar spanska och älskar tapas', 'https://example.com/profiles/sara.jpg'),
      ('Johan Berg', 'johanb', 'Matnörd och hobbykock', 'https://example.com/profiles/johan.jpg'),
      ('Elin Nilsson', 'elin_n', 'Upptäcker nya restauranger varje vecka', 'https://example.com/profiles/elin.jpg'),
      ('Martin Persson', 'martinp', 'Alltid på jakt efter nya viner', 'https://example.com/profiles/martin.jpg'),
      ('Lisa Andersson', 'lisaa', 'Älskar att lära sig språk', 'https://example.com/profiles/lisa.jpg'),
      ('David Eriksson', 'david_e', 'Reser och provar mat', 'https://example.com/profiles/david.jpg'),
      ('Emma Johansson', 'emma_j', 'Kaffeälskare och språknörd', 'https://example.com/profiles/emma.jpg'),
      ('Karin Olsson', 'karin_o', 'Vinprovningsfantast', 'https://example.com/profiles/karin.jpg');
  `);

  await db.query(`
    INSERT INTO user_follows (follower_id, following_id) VALUES
      (1, 2),
      (1, 3),
      (2, 1),
      (3, 1),
      (4, 1),
      (5, 1),
      (6, 2),
      (7, 3),
      (8, 1),
      (9, 4),
      (10, 2);
  `);

  await db.query(`
    INSERT INTO user_followed_tags (user_id, tag_id) VALUES
      (1, 1),
      (1, 2),
      (2, 2),
      (3, 3),
      (4, 1),
      (5, 4),
      (6, 5),
      (7, 1),
      (8, 2),
      (9, 3),
      (10, 4);
  `);

  await db.query(`
    INSERT INTO user_followed_cities (user_id, city_id) VALUES
      (1, 1),
      (2, 3),
      (3, 1),
      (4, 2),
      (5, 4),
      (6, 5),
      (7, 1),
      (8, 2),
      (9, 3),
      (10, 4);
  `);

  await db.query(`
    INSERT INTO user_events_saved (user_id, event_id) VALUES
      (1, 1),
      (2, 2),
      (3, 1),
      (4, 2),
      (5, 1),
      (6, 2);
  `);

  await db.query(`
    INSERT INTO user_events_participating (user_id, event_id) VALUES
      (1, 1),
      (2, 2),
      (3, 1),
      (4, 2),
      (5, 1),
      (6, 2);
  `);

  console.log('✅ Users and all relations seeded');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
