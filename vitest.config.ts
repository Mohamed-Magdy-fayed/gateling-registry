import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"

// Runs the tests that ship inside registry items, so the source of truth is
// verified here before any consumer installs it. `server-only` throws outside
// a React Server Component graph, which is exactly what a unit test is.
export default defineConfig({
  resolve: {
    alias: {
      "server-only": fileURLToPath(
        new URL("./src/test/server-only-stub.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "node",
    include: ["src/registry/**/*.test.ts"],
  },
})
