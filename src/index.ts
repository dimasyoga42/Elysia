import { Elysia, t } from "elysia";
import dotenv from "dotenv"
import axios from "axios";
import { waifuHandler } from "./controller/waifu";
import { xtalHandler } from "./controller/toram/xtal";
dotenv.config()
const app = new Elysia({prefix: "/api"})
  .get("/waifu", () => waifuHandler())
  .get("/toram/xtal", ({ query }) => xtalHandler(query.name), {
    query: t.Object({
      name: t.String({ minLength: 1, error: "name wajib di isi" })
    }
    )
    })
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




app.listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
