#!/usr/bin/env -S deno run -A --watch=static/,routes/ --allow-env

import dev from "$fresh/dev.ts";

await dev(import.meta.url, "./main.ts");
