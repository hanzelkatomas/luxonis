import {getRows, getRowsCount} from "./database.ts";

export function runApiEndpoint() {
  Bun.serve({
    port: 800,
    fetch: async (req) => {
      const url = new URL(req.url);
      const page = url.searchParams?.get("page");
      const limit = url.searchParams?.get("limit");

      const rows = await getRows(page, limit);
      const rowsCount = await getRowsCount();

      const body = JSON.stringify({
        totalCount: rowsCount[0].count,
        items: rows
      });

      return new Response(
        body,{
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  })
  console.log('Server listening on port 8080');
}

