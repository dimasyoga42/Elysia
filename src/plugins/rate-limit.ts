import { Elysia } from "elysia";
import { checkRateLimit } from "../lib/rate";

export const rateLimitPlugin = new Elysia().macro({
  rateLimit: (config: { limit: number; windowMs: number }) => ({
    beforeHandle({ request, set, server }) {
      // ambil IP asli, prioritaskan x-forwarded-for kalau di belakang proxy/reverse proxy
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        server?.requestIP(request)?.address ??
        "unknown";

      const result = checkRateLimit(ip, config.limit, config.windowMs);

      set.headers["X-RateLimit-Limit"] = String(config.limit);
      set.headers["X-RateLimit-Remaining"] = String(result.remaining);
      set.headers["X-RateLimit-Reset"] = String(Math.ceil(result.resetMs / 1000));

      if (!result.allowed) {
        set.status = 429;
        return {
          success: false,
          message: "Terlalu banyak request, coba lagi nanti"
        };
      }
    }
  })
});
