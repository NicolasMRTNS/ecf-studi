# Médiathèque La Chapelle-Curreaux - ECF Studi

## Local installation

To install locally, first clone the repo. Once cloned, you can run the following command:

```bash
cd ./frontend && npm install && npm run dev
```

```bash
cd ../backend && npm install && npm start
```

Add .env files to both frontend and backend. In frontend, you can add the following:

```bash
API_URL=http://localhost:4200
FRONT_DEV_ENV=DEV
```

In backend, add:

```bash
MONGO_ATLAS_URL=ASK_ME
FRONT_URL=http://localhost:3000
```

The app is available at http://localhost:3000.
To connect as an employee, your credentials are: **admin@admin.fr / test1234**.
To connect as a user, your credentials are: **john@doe.fr / test1234**

## Production

The production app is available at https://mediatheque-chapelle-curreaux.netlify.app/.

To be connected as an employee, your credentials are: **test@admin.fr / 0T1RypqioUBf9a2o6F81**.
To be connected as a user, your credentials are: **john@doe.fr / AzzJeFZhckyfqS0eN0Ek**.

The backend app is hosted on Heroku.
