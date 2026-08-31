import { Elysia, t } from "elysia";
import dotenv from "dotenv"
import cors from "@elysiajs/cors"
import { waifuHandler } from "./controller/waifu";
import { xtalHandler } from "./controller/toram/xtal";
import { checkRateLimit } from "./lib/rate";
//import { rateLimitPlugin } from "./plugins/rate-limit";
dotenv.config()
const app = new Elysia({ prefix: "/api" })
  .onError(({ code, error, set }) => {
  if (code === "VALIDATION") {
    set.status = 400
    return {
            success: false,
            message: error.message,
            errors: error.all.map(e => ({
              field: e.path,
              message: e.message
            }))
    }
  }
})
  .onBeforeHandle(({ request, set, server }) => {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        server?.requestIP(request)?.address ??
        "unknown";

      const result = checkRateLimit(ip, 100, 60_000); // 100 req/menit global

      set.headers["X-RateLimit-Limit"] = "100";
      set.headers["X-RateLimit-Remaining"] = String(result.remaining);

      if (!result.allowed) {
        set.status = 429;
        return { success: false, message: "Terlalu banyak request, coba lagi nanti" };
      }
    })
  .use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: false
  }))
  .get("/waifu", () => waifuHandler())
  .get("/toram/xtal", ({ query }) => xtalHandler(query.name), {
    query: t.Object({
      name: t.String({ minLength: 1, error: "name wajib di isi" })
    }
    )
  })
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
