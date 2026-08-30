import { Elysia, t } from "elysia";
import dotenv from "dotenv"
import axios from "axios";
dotenv.config()
const app = new Elysia()
app.onError(({code, error, set}) => {
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
app.get("/", () => {
  return {
    message: "elysia js"
  }
});

app.get("/waifu", async () => {
  try {
    const res = await axios.get("https://api.waifu.im/images")
    const image = await axios.get(res.data.items[0]?.url, { responseType: 'arraybuffer' })
    return new Response(image.data, {
      headers: { 'Content-Type': 'image/jpeg' }
    })
  } catch (err) {
   Error("terjadi kesalahan pada server")
  }
})
app.listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
