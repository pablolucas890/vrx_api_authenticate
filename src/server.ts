import cors from '@fastify/cors';
import crypto from 'crypto';
import Fastify from 'fastify';
import * as fs from 'fs';
import sqlite3 from 'sqlite3';
import { CFG_FILE, DB3, HOST, PORT } from './global/consts';
import { Users } from './global/props';

const cfg = JSON.parse(fs.readFileSync(CFG_FILE, 'utf8'));

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

  if (cfg.username && cfg.password) {
    app.addHook('preHandler', async (request, reply) => {
      if (!(request.url === '/' && request.method === 'GET')) return;

      const auth = request.headers.authorization || '';
      const [scheme, credentials] = auth.split(' ');
      if (scheme && scheme.toLowerCase() === 'basic') {
        const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');
        if (!login || !password || login !== cfg.username || password !== cfg.password) {
          reply.header('WWW-Authenticate', 'Basic realm="401"');
          reply.code(401).send('Autenticação requerida.');
        }
      } else {
        reply.header('WWW-Authenticate', 'Basic realm="401"');
        reply.code(401).send('Autenticação requerida.');
      }
    });
  }

  app.get('/', async (request, reply) => {
    return reply.type('text/html').send('<h1>Hello World</h1>');
  });

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
