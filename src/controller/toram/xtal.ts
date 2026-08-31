import { db } from "../../lib/db"
import { Xtal } from "../../lib/interface";

export const xtalHandler = async (name: string) => {
  try {
    const { data, error } = await db
      .from("xtal")
      .select("name, type, upgrade_route, stats, max_upgrade_route")
      .ilike("name", `%${name}%`);

    if (error) {
      console.error(error);
      return { message: "Terjadi kesalahan saat mengambil data" };
    }

    if (!data || data.length === 0) {
      return { message: "Xtal tidak ditemukan" };
    }

    const result: Xtal[] = data.map((i) => ({
      name: i.name,
      type: i.type,
      stat: i.stats,
      rute: i.upgrade_route,
      maxRute: i.max_upgrade_route,
    }));

    return { result };

  } catch (err) {
    console.error(err);
    return { message: "Terjadi kesalahan tak terduga" };
  }
};
