import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',     // Ändra till din DB-host
  user: 'root',          // Ditt DB-användarnamn
  password: 'Spiri2005.',  // Ditt DB-lösenord
  database: 'demo_app',  // Din databas
});