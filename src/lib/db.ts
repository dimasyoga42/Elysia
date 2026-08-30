import { createClient } from "@supabase/supabase-js";
import endpointConfig from "../../endpoint.config";



export const db = createClient( endpointConfig.supabaseUrl , endpointConfig.supabaseKey)
