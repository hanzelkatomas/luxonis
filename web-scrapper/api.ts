export function runApiEndpoint(data) {
  Bun.serve({
    port: 8080,
    fetch() {
      return new Response(JSON.stringify(data), {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  })
  console.log('Server listening on port 8080');
}

