import mongoose, { Schema } from "mongoose"

const ImageNime = new Schema({
  name: {type: String, required: true},
  urlImage: { type: String, required: true },
  IsNude: {type: Boolean, required: true}
})

export type Waifu = mongoose.InferSchemaType<typeof ImageNime>;
export const Waifu = mongoose.model("Waifu", ImageNime);
