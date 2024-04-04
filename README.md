# vrx_api_authenticate

## Enviroment

- Eslist configs:
  - Install extensions (Eslint) and (Prettier ESLint)
  - edit Settings.json for vscode with
    ```
    "[javascript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
            "source.organizeImports": true
        }
    },
    "[javascriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
            "source.organizeImports": true
        }
    },
    "[typescript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
            "source.organizeImports": true
        }
    },
    "[typescriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
            "source.organizeImports": true,
        },
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    ```

## Development

### Client
- Node Version: `v16.20.0`
  - Install `nvm` on machine to controll the node versions
  - `nvm install 16.20.0`
  - `nvm use 16.20.0`
- Install packages:   `npm install --legacy-peer-deps`
- Start server: `npm run start`
- Build: `npm run build`
- Format code with Prettier: `npm run format`
- Check sintax and style on projet: `npm run lint`
- Fix sintax and style on projet with eslit: `npm run lint:fix`

### Server
- Node Version: `v16.20.0`
  - Install `nvm` on machine to controll the node versions
  - `nvm install 16.20.0`
  - `nvm use 16.20.0`
- Install packages:   `npm install`
- Start server: `npm run start` || start server with auto reload: `npm run dev`
- Format code with Prettier: `npm run format`
- Check sintax and style on projet: `npm run lint`
- Fix sintax and style on projet with eslit: `npm run lint:fix`
- Create `auth.ts` file at `src/global` with:
    ```js
    export const USERNAME = 'admin';
    export const PASSWORD = 'admin';
    export const JWT_SECRET = 'secret';
    ```

## Production

### Client
- Download repository and enter client with `cd client/`
- Edit `src/global/utils.ts` with `SERVER_PROTOCOL`, `SERVER_HOST` and `SERVER_IP`
- Build project with `npm run build`
- Download Apache Package with `apt install apache2`
- Enable rewrite from apache with `a2enmod rewrite`
- Edit `/etc/apache2/sites-available/000-default.conf` file with:
    ```
    <Directory "/var/www/html/meu-site">
        RewriteEngine on
        RewriteCond %{REQUEST_FILENAME} -f [OR]
        RewriteCond %{REQUEST_FILENAME} -d
        RewriteRule ^ - [L]
        RewriteRule ^ index.html [L]
    </Directory>
    ```
- Send `build` files to `html` apache folder
- Restart apache with `service apache2 restart`

### Server
- Download repository and enter server with `cd server/`
- Download `docker` and `docker-compose` packages with `apt install docker docker-compose`
- Create `auth.ts` file at `src/global` with:
    ```js
    export const USERNAME = '';
    export const PASSWORD = '';
    export const JWT_SECRET = '';
    ```
- Execute `./api-update.sh` to download and execute docker image
- Execute `ln -sf /home/ubuntu/vrx_api_authenticate/server/api-update.sh /etc/cron.hourly/vrx_api_authenticate` to restart container every hour with correct `path`
- Create `/etc/systemd/system/vrx_api_authenticate-update.service` file  with 
    ```
    [Unit]
    Description = VRX API Authenticate Service
    After = network.target

    [Service]
    Type = oneshot
    #  Change path
    WorkingDirectory = /home/ubuntu/vrx_api_authenticate/server/
    # Change path 
    ExecStart = /bin/bash /home/ubuntu/vrx_api_authenticate/server/api-update.sh

    [Install]
    WantedBy = multi-user.target

    ```
- Enable service with `systemctl enable vrx_api_authenticate-update`
- Start service with `systemctl start vrx_api_authenticate-update`