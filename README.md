# Social network

A social networking monorepo designed for learning and practising new practices and technologies

## ⚙️ Technologies

### Client

- react.js
- redux.js
- redux-form
- axios

### Server

- node.js
- express.js

## 🚀 Installation

### Client

```shell
cd client
npm install
npm run start
```

### 🎉 The Client started on [http://localhost:3000](http://localhost:3000)

### Server

```shell
cd server
npm install
```

1. Create `.env` file
2. Insert into the file:

```dotenv
PORT=5000
CLIENT_URL=http://localhost:3000
```

3. Run `npm run start`

### 🎉 The sever started on [http://localhost:5000](http://localhost:5000)

## :octocat: GitHub Pages

> Before deploying the app, you must set up GitHub Page for your project.

### Client

1. open `package.json`
2. add to root `"homepage": "https://<username>.github.io/<project>",`
3. run `npm run deploy`

### Server

Add to file `.env`:

```dotenv
GITHUB_PAGES_URL=https://<username>.github.io
```