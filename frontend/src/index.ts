import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: 3001,
  routes: {
    // Proxy API requests to backend
    "/category/": {
      GET: async (req) => {
        const url = new URL(req.url);
        const backendUrl = `http://localhost:3000${url.pathname}`;
        const response = await fetch(backendUrl);
        return response;
      }
    },
    "/catalogue/": {
      GET: async (req) => {
        const url = new URL(req.url);
        const backendUrl = `http://localhost:3000${url.pathname}${url.search}`;
        const response = await fetch(backendUrl);
        return response;
      }
    },

    // Serve index.html for all other routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
