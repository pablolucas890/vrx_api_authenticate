import cors from '@fastify/cors';
import crypto from 'crypto';
import Fastify from 'fastify';
import * as fs from 'fs';
import sqlite3 from 'sqlite3';
import { DB3, HOST, PORT } from './global/consts';
import { Users } from './global/props';

async function createDb3() {
  const db = new sqlite3.Database(DB3);
  if (!fs.existsSync(DB3)) {
    fs.writeFileSync(DB3, '');
  }
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, salt TEXT)',
  );
  db.close();
}

async function getUsers(db: sqlite3.Database): Promise<[Users]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, users) => {
      if (err) reject(err);
      else {
        resolve(users as [Users]);
      }
    });
  });
}

async function bootstrap() {
  const app = Fastify({ logger: false });

  await app.register(cors, { origin: true });

  app.post('/auth', async (request, reply) => {

    const { email, password } = request.body as { email: string; password: string };
    const db = new sqlite3.Database(DB3);
    const users = await getUsers(db);
    const user = users.find((user: { email: string }) => user.email === email);

    if (!user) {
      return reply.status(401).send({ message: 'User not found' });
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== user.password) {
      return reply.status(401).send({ message: 'Invalid password' });
    }

    return reply.status(200).send({ message: 'Authenticated' });
  });

  app.listen({ port: PORT, host: HOST }, err => {
    if (err) throw err;
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

createDb3();
bootstrap();
