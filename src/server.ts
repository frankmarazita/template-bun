export interface ServerOptions {
  port: number;
}

export function createServer(options: ServerOptions) {
  return Bun.serve({
    port: options.port,
    routes: {
      "/": new Response("OK"),
      "/health": Response.json({ status: "ok" }),
    },
    fetch() {
      return new Response("Not Found", { status: 404 });
    },
  });
}
