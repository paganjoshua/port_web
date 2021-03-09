const http = require('http');
const path = require('path');
const fs = require('fs');
const router = require('./routing/router');

require('dotenv').config();
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT;

const server = http.createServer((req, res) => {
  console.log(req.url);

  let file_path = path.resolve(__dirname, req.url === '/' ? 'client/html/index.html' : 'dist/bundle.js');
  console.log(file_path);
  const extname = path.extname(file_path);
  let contentType = null;
  switch(extname) {
    case ('.html'):
      contentType = 'text/html';
      break;
    case ('.css'):
      contentType = 'text/css';
      break;
    case ('.js'):
      contentType = 'text/javascript';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  let body = [];
  req.on('data', (chunk, err) => {
    if (err) {
      throw new Error;
    } else {
      body.push(chunk)
    }
  })
  .on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(`body: ${body}`);

    const { url, method } = req;
    const route = router(url, method, contentType, body);
    const { status, headers, data } = route.client;

    fs.readFile(file_path, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('some wozboz...');
      } else {
        console.log(`route: ${route}`);
        res.writeHead(status || 500, headers);
        // if (data !== null) res.write(data);
        res.end(data);
      }
    })
  })
});

server.listen(PORT, () => { console.log(`wizbiz on port: ${PORT}`) });