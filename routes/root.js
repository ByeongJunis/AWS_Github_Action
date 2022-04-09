'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply
      .code(200)
      .header('Content-Type', 'text/html; charset=utf-8')
      .send(`<!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body>
      
      <div class="container mt-3">
        <h2>서버 상태 메시지.</h2>
        <div class="mt-4 p-5 bg-primary text-white rounded">
          <h1>서버가 정상 작동중입니다.</h1> 
          <p>데이터베이스도 연결되었습니다...</p> 
        </div>
      </div>
      
      </body>
      </html>
      `)
  })
}