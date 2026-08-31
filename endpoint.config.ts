
//env modul
export default {
  supabaseUrl: process.env.SUPABASE_URL ?? '',
  supabaseKey: process.env.SUPABASE_KEY ?? '',
  MongodbUrl: process.env.MONGODB_URL ?? ''
}
