import { userRoutes } from "@/interfaces/routes/userRoutes";

Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method as "GET" | "POST" | "DELETE";

    const route = userRoutes[path];
    if (route && route[method]) {
      return route[method]!(req);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
