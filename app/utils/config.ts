import * as mod from "dotenv";

import EnvNames from "../constants/EnvVars.ts";

if (Deno.env.get(EnvNames.DENO_ENV) !== "production") {
  await mod.config({
    export: true,
  });
}

import { Config, ConfigSchema } from "@/schemas/Config.ts";

const envConfig: Config = {
  cookie_secret: Deno.env.get(EnvNames.APP_COOKIE_SECRET) || "",
  map_tile_url: Deno.env.get(EnvNames.APP_MAP_TILE_URL) || "",
  // TODO: update to use parameterized port
  base_url: Deno.env.get(EnvNames.APP_BASE_URL) ||
    "http://localhost:8000",
  environment: Deno.env.get(EnvNames.DENO_ENV) || "",
  db: {
    database: Deno.env.get(EnvNames.POSTGRES_DB) || "",
    host: Deno.env.get(EnvNames.POSTGRES_HOST) || "",
    username: Deno.env.get(EnvNames.POSTGRES_USER) || "",
    password: Deno.env.get(EnvNames.POSTGRES_PASSWORD) || "",
    port: Number(Deno.env.get(EnvNames.POSTGRES_PORT) || 5432),
  },
  db_uri: "",
  oauth: {
    discord: {
      client_id: Deno.env.get(EnvNames.DISCORD_CLIENT_ID) || "",
      client_secret: Deno.env.get(EnvNames.DISCORD_CLIENT_SECRET) || "",
    },
  },
};

envConfig.db_uri =
  `postgres://${envConfig.db.username}:${envConfig.db.password}@${envConfig.db.host}:${envConfig.db.port}/${envConfig.db.database}`;

// TODO: maybe... cleanup the error that is logged
const config = ConfigSchema.parse(envConfig);

export default config;
