import * as crypto from 'crypto';
import sqlite3 from 'sqlite3';
import { DB3 } from '../global/consts';

export default function hashPassword(email: string, password: string) {
  const salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  const db = new sqlite3.Database(DB3);
  db.run('INSERT INTO users (email, password, salt) VALUES (?, ?, ?)', [email, hash, salt], err => {
    if (err) console.error(err);
  });
  db.close();

  return {
    salt,
    hash,
  };
}
