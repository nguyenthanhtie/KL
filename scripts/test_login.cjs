const http = require('http');

const data = JSON.stringify({
  email: process.env.TEST_EMAIL || 'test@test.com',
  password: process.env.TEST_PASSWORD || 'Test1234!'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    try {
      console.log('BODY', JSON.parse(body));
    } catch (e) {
      console.log('BODY', body);
    }
  });
});

req.on('error', (err) => {
  console.error('REQUEST ERROR', err.message);
});

req.write(data);
req.end();
