import { Elysia, t } from "elysia";
import { waifuHandler } from "../controller/waifu";
import { xtalHandler } from "../controller/toram/xtal";
import { gempaHendler } from "../controller/etc/gempa";

export const Router = new Elysia()
  .get("/waifu", () => waifuHandler())
  .get("/toram/xtal", ({ query }) => xtalHandler(query.name), {
    query: t.Object({
      name: t.String({ minLength: 1, error: "name wajib di isi" })
    }
    )
  })
.get("/etc/gempa", gempaHendler())
