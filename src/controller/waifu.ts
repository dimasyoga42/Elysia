import axios from "axios"

export const waifuHandler = async () => {
  try {
    const res = await axios.get("https://api.waifu.im/images")
    const image = await axios.get(res.data.items[0]?.url, { responseType: 'arraybuffer' })
    return new Response(image.data, {
      headers: { 'Content-Type': 'image/jpeg' }
    })
  } catch (err) {
    Error("terjadi kesalahan pada saat load data");
  }
}
