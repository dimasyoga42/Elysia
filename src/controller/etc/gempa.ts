import axios from "axios"
import { XMLParser } from "fast-xml-parser"

export const gempaHendler = async () => {
  try {
    const res = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml")
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    })
    const data = parser.parse(res.data)
    return {
      data: data.Infogempa.gempa
    }
  } catch (err) {
    console.log(err)
    return {
      data: null,
      error: "Gagal mengambil data gempa"
    }
  }
}
