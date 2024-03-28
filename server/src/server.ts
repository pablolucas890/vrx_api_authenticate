import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import crypto from 'crypto';
import Fastify from 'fastify';
import * as fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import sqlite3 from 'sqlite3';
import { JWT_SECRET, PASSWORD, USERNAME } from './global/auth';
import { Users } from './global/props';
import { DAYS_TO_EXPIRE, DB3, SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } from './global/utils';

const __dirname = path.resolve();

async function createDb3() {
  const db = new sqlite3.Database(DB3);
  if (!fs.existsSync(DB3)) {
    fs.writeFileSync(DB3, '');
  }
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, phone TEXT, password TEXT, salt TEXT, forgotPassword BOOLEAN DEFAULT 0)',
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

async function insertUser(
  db: sqlite3.Database,
  id: number | undefined,
  name: string,
  email: string,
  phone: string,
  password: string,
  salt: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (id)
      db.run(
        'UPDATE users SET name = ?, email = ?, phone = ?, password = ?, salt = ?, forgotPassword = 0 WHERE id = ?',
        [name, email, phone, password, salt, id],
        err => {
          if (err) reject(err);
          else resolve();
        },
      );
    else
      db.run(
        'INSERT INTO users (name, email, phone, password, salt) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, password, salt],
        err => {
          if (err) reject(err);
          else resolve();
        },
      );
  });
}

async function deleteUser(db: sqlite3.Database, id: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], err => {
      if (err) reject(err);
      else {
        resolve();
      }
    });
  });
}

function hashPassword(email: string, password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  return { salt, hash };
}

async function bootstrap() {
  const app = Fastify({ logger: false });

  await app.register(cors, { origin: true });

  await app.register(formbody);

  await app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });

  if (USERNAME && PASSWORD) {
    app.addHook('preHandler', async (request, reply) => {
      if (request.url === '/auth' && request.method === 'POST') return;
      else if (request.url === '/verify' && request.method === 'POST') return;
      else if (request.url.startsWith('/forgot') && request.method === 'GET') return;
      else if (request.url.startsWith('/environments') && request.method === 'GET') return;

      const auth = request.headers.authorization || '';
      const [scheme, credentials] = auth.split(' ');
      if (scheme && scheme.toLowerCase() === 'basic') {
        const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');
        if (!login || !password || login !== USERNAME || password !== PASSWORD) {
          reply.header('WWW-Authenticate', 'Basic realm="401"');
          reply.code(401).send('Autenticação requerida.');
        }
      } else {
        reply.header('WWW-Authenticate', 'Basic realm="401"');
        reply.code(401).send('Autenticação requerida.');
      }
    });
  }

  // API routes
  app.post('/register', async (request, reply) => {
    const { id, email, password, name, phone } = request.body as Users;
    if (!email || !password) {
      return reply.status(400).send({ message: 'Email and password are required' });
    }
    try {
      const { salt, hash } = hashPassword(email, password);
      const db = new sqlite3.Database(DB3);
      insertUser(db, id, name, email, phone, hash, salt);
      db.close();
      return reply.status(201).send({ message: 'User created' });
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/users', async (request, reply) => {
    try {
      const db = new sqlite3.Database(DB3);
      const users = await getUsers(db);
      db.close();
      return reply.status(200).send(users);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });

  app.get('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const db = new sqlite3.Database(DB3);
      const users = await getUsers(db);
      const user = users.find((user: Users) => user.id === parseInt(id));
      db.close();
      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }
      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });

  app.delete('/user/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: number };
      const db = new sqlite3.Database(DB3);
      deleteUser(db, id);
      const users = await getUsers(db);
      db.close();
      return reply.status(200).send(users);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });

  app.get('/forgot/:email', async (request, reply) => {
    try {
      // TODO: Implementar envio de email
      const { email } = request.params as { email: string };
      const db = new sqlite3.Database(DB3);
      const users = await getUsers(db);
      const user = users.find((user: Users) => user.email === email);
      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }
      db.run('UPDATE users SET forgotPassword = 1 WHERE email = ?', [email]);
      db.close();
      return reply.status(200).send({ message: 'Nosso time já foi notificado, logo entraremos em contato' });
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });

  // Sketchup Authenticaion
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
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: DAYS_TO_EXPIRE * 24 * 60 * 60,
    });
    return reply.status(200).send({ message: 'Authenticated', token: token });
  });

  app.post('/verify', async (request, reply) => {
    const { token } = request.body as { token: string };
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return reply.status(200).send({ message: 'Valid token', decoded });
    } catch (error) {
      return reply.status(401).send({ message: 'Invalid token' });
    }
  });

  // Download environments
  app.get('/environments/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const filePath = path.join(__dirname, 'public', `${id}`); // Caminho do arquivo para baixar
    if (!fs.existsSync(filePath)) {
      return reply.status(404).send({ message: 'File not found' });
    }
    return reply.sendFile(`${id}`); // Envie apenas o nome do arquivo
  });

  app.listen({ port: SERVER_PORT, host: SERVER_HOST }, err => {
    if (err) throw err;
    console.log(`Server listening on ${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`);
  });
}

createDb3();
bootstrap();
